import { useCallback, useRef, useState } from "react";
import type maplibregl from "maplibre-gl";
import type { Pin, PinKey } from "../domain/types.ts";
import { MarkerStore } from "../infrastructure/map/markers.ts";
import { RouteLine } from "../infrastructure/map/routeLine.ts";
import { type PinPair, useJourneys } from "./queries.ts";

/** ピン設置 → 経路検索、のアプリケーション状態と操作をまとめたフック */
export function useRoutePick() {
  const markersRef = useRef(new MarkerStore());
  const routeLineRef = useRef(new RouteLine());
  // いま選択中のピン。地図クリックはこのピンだけを動かす
  const [active, setActive] = useState<PinKey>("from");
  const [pins, setPins] = useState<Record<PinKey, Pin | null>>({ from: null, to: null });
  // 「経路を検索」を押した時点のピンペア。これをキーに useJourneys が走る
  const [searchPair, setSearchPair] = useState<PinPair | null>(null);

  const journeys = useJourneys(searchPair);

  /** 地図クリック時: 選択中のピンを置き直し、両方揃っていればピン間の直線を引く */
  const placePin = useCallback((map: maplibregl.Map, lat: number, lng: number) => {
    markersRef.current.setPin(map, active, lat, lng);
    const next = { ...pins, [active]: { lat, lon: lng } };
    setPins(next);
    if (next.from && next.to) routeLineRef.current.draw(map, next.from, next.to);
  }, [active, pins]);

  const canSearch = !!(pins.from && pins.to) && !journeys.isFetching;

  const search = useCallback(() => {
    if (pins.from && pins.to) setSearchPair({ from: pins.from, to: pins.to });
  }, [pins]);

  return { pins, active, setActive, journeys, canSearch, search, placePin };
}
