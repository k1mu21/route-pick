import { useCallback, useRef, useState } from "react";
import type maplibregl from "maplibre-gl";
import type { Pin, PinKey } from "../domain/types.ts";
import { MarkerStore } from "../infrastructure/map/markers.ts";
import { type PinPair, useJourneys } from "./queries.ts";

/** ピン設置 → 経路検索、のアプリケーション状態と操作をまとめたフック */
export function useRoutePick() {
  const markersRef = useRef(new MarkerStore());
  // いま選択中のピン。地図クリックはこのピンだけを動かす
  const [active, setActive] = useState<PinKey>("from");
  const [pins, setPins] = useState<Record<PinKey, Pin | null>>({ from: null, to: null });
  // 「経路を検索」を押した時点のピンペア。これをキーに useJourneys が走る
  const [searchPair, setSearchPair] = useState<PinPair | null>(null);

  const journeys = useJourneys(searchPair);

  /** 地図クリック時: 選択中のピンを置き直す */
  const placePin = useCallback((map: maplibregl.Map, lat: number, lng: number) => {
    markersRef.current.setPin(map, active, lat, lng);
    setPins((p) => ({ ...p, [active]: { lat, lon: lng } }));
  }, [active]);

  const canSearch = !!(pins.from && pins.to) && !journeys.isFetching;

  const search = useCallback(() => {
    if (pins.from && pins.to) setSearchPair({ from: pins.from, to: pins.to });
  }, [pins]);

  return { pins, active, setActive, journeys, canSearch, search, placePin };
}
