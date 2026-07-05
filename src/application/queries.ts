import { useQuery } from "@tanstack/react-query";
import type { Pin } from "../domain/types.ts";
import { fetchJourneys } from "../infrastructure/transitApi.ts";

/** ピン座標間の経路を取得する。同じ座標ペアはキャッシュから即時表示される */
export function useJourneys(pair: { from: Pin; to: Pin } | null) {
  return useQuery({
    queryKey: ["journeys", pair?.from.lat, pair?.from.lon, pair?.to.lat, pair?.to.lon],
    queryFn: () => fetchJourneys(pair!.from, pair!.to),
    enabled: !!pair,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
