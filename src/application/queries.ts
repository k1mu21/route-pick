import { skipToken, useQuery } from "@tanstack/react-query";
import type { Pin } from "../domain/types.ts";
import { fetchJourneys } from "../infrastructure/transitApi.ts";

export interface PinPair {
  from: Pin;
  to: Pin;
}

/** ピン座標間の経路を取得する。同じ座標ペアはキャッシュから即時表示される */
export function useJourneys(pair: PinPair | null) {
  return useQuery({
    queryKey: ["journeys", pair],
    queryFn: pair ? () => fetchJourneys(pair.from, pair.to) : skipToken,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
