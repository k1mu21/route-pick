import { useCallback, useEffect, useRef, useState } from "react";
import type maplibregl from "maplibre-gl";
import type { Pin, PinKey, Station } from "../domain/types.ts";
import { MarkerStore } from "../infrastructure/map/markers.ts";
import { useJourneys, useNearestStation } from "./queries.ts";

/** ピン設置 → 最寄駅検索 → 経路検索、のアプリケーション状態と操作をまとめたフック */
export function useRoutePick() {
  const markersRef = useRef(new MarkerStore());
  const mapRef = useRef<maplibregl.Map | null>(null);
  const nextRef = useRef<PinKey>("from");
  const [pins, setPins] = useState<Record<PinKey, Pin | null>>({ from: null, to: null });
  // 「経路を検索」を押した時点の駅ペア。これをキーに useJourneys が走る
  const [searchPair, setSearchPair] = useState<{ from: Station; to: Station } | null>(null);

  const fromStation = useNearestStation(pins.from);
  const toStation = useNearestStation(pins.to);
  const journeys = useJourneys(searchPair);

  /** 地図クリック時: 出発→到着の順にピンを置く（最寄駅はクエリが自動で取得） */
  const placePin = useCallback((map: maplibregl.Map, lat: number, lng: number) => {
    const key = nextRef.current;
    nextRef.current = key === "from" ? "to" : "from";
    mapRef.current = map;
    markersRef.current.setPin(map, key, lat, lng);
    setPins((p) => ({ ...p, [key]: { lat, lon: lng } }));
  }, []);

  // 最寄駅が取得できたら駅マーカーを表示する
  useEffect(() => {
    if (fromStation.data && mapRef.current) markersRef.current.setStation(mapRef.current, "from", fromStation.data);
  }, [fromStation.data]);
  useEffect(() => {
    if (toStation.data && mapRef.current) markersRef.current.setStation(mapRef.current, "to", toStation.data);
  }, [toStation.data]);

  const canSearch = !!(fromStation.data && toStation.data) && !journeys.isFetching;

  const search = useCallback(() => {
    if (fromStation.data && toStation.data) {
      setSearchPair({ from: fromStation.data, to: toStation.data });
    }
  }, [fromStation.data, toStation.data]);

  return { pins, fromStation, toStation, journeys, canSearch, search, placePin };
}
