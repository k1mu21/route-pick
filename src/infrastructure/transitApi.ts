import type { Journey, Pin } from "../domain/types.ts";

const API = "https://api.transit.ls8h.com/api/v1";
const MAX_JOURNEYS = 5;

interface PlanResponse {
  journeys?: Journey[];
}

/** ピン座標間の電車経路を最大5件取得する。最寄駅の選定はAPI側が行う */
export async function fetchJourneys(from: Pin, to: Pin): Promise<Journey[]> {
  const params = new URLSearchParams({
    from: `geo:${from.lat},${from.lon}`,
    to: `geo:${to.lat},${to.lon}`,
    fromLabel: "出発",
    toLabel: "到着",
    allowModes: "rail",
    numItineraries: String(MAX_JOURNEYS),
  });
  const res = await fetch(`${API}/plan?${params}`);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data: PlanResponse = await res.json();
  return (data.journeys ?? []).slice(0, MAX_JOURNEYS);
}
