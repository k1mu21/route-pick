import { useCallback, useRef, useState } from "react";
import type maplibregl from "maplibre-gl";
import type { Pin, PinKey } from "../domain/types.ts";
import { MarkerStore } from "../infrastructure/map/markers.ts";
import { useJourneys } from "./queries.ts";

/** ピン設置 → 経路検索、のアプリケーション状態と操作をまとめたフック */
export function useRoutePick() {
  const markersRef = useRef(new MarkerStore());
  const nextRef = useRef<PinKey>("from");
  const [pins, setPins] = useState<Record<PinKey, Pin | null>>({ from: null, to: null });
  // 「経路を検索」を押した時点のピンペア。これをキーに useJourneys が走る
  const [searchPair, setSearchPair] = useState<{ from: Pin; to: Pin } | null>(null);

  const journeys = useJourneys(searchPair);

  /** 地図クリック時: 出発→到着の順にピンを置く */
  const placePin = useCallback((map: maplibregl.Map, lat: number, lng: number) => {
    const key = nextRef.current;
    nextRef.current = key === "from" ? "to" : "from";
    markersRef.current.setPin(map, key, lat, lng);
    setPins((p) => ({ ...p, [key]: { lat, lon: lng } }));
  }, []);

  const canSearch = !!(pins.from && pins.to) && !journeys.isFetching;

  const search = useCallback(() => {
    if (pins.from && pins.to) setSearchPair({ from: pins.from, to: pins.to });
  }, [pins]);

  return { pins, journeys, canSearch, search, placePin };
}
