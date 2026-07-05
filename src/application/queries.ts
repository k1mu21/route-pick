import { useQuery } from "@tanstack/react-query";
import type { Pin, Station } from "../domain/types.ts";
import { fetchJourneys, fetchNearestStation } from "../infrastructure/transitApi.ts";

/** ピン位置の最寄駅を取得する。座標がキーなので同じ場所は再フェッチしない */
export function useNearestStation(pin: Pin | null) {
  return useQuery({
    queryKey: ["nearestStation", pin?.lat, pin?.lon],
    queryFn: () => fetchNearestStation(pin!.lat, pin!.lon),
    enabled: !!pin,
    staleTime: Infinity,
    retry: false,
  });
}

/** 駅ペア間の経路を取得する。同じ駅ペアはキャッシュから即時表示される */
export function useJourneys(pair: { from: Station; to: Station } | null) {
  return useQuery({
    queryKey: ["journeys", pair?.from.endpoint, pair?.to.endpoint],
    queryFn: () => fetchJourneys(pair!.from, pair!.to),
    enabled: !!pair,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
