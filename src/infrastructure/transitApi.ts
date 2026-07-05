import type { Journey, Pin } from "../domain/types.ts";

const API = "https://api.transit.ls8h.com/api/v1";

/** ピン座標間の電車経路を最大3件取得する。最寄駅の選定はAPI側が行う */
export async function fetchJourneys(from: Pin, to: Pin): Promise<Journey[]> {
  const url = `${API}/plan?from=geo:${from.lat},${from.lon}&to=geo:${to.lat},${to.lon}` +
    `&fromLabel=${encodeURIComponent("出発")}&toLabel=${encodeURIComponent("到着")}` +
    `&allowModes=rail&numItineraries=5`;
  const r = await fetch(url);
  if (!r.ok) throw new Error("API error " + r.status);
  const d = await r.json();
  return (d.journeys || []).slice(0, 5);
}
