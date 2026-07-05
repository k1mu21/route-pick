import type { Journey, Station } from "../domain/types.ts";

const API = "https://api.transit.ls8h.com/api/v1";

/** ピン位置から2km以内の最寄駅を取得する。見つからなければ例外を投げる */
export async function fetchNearestStation(lat: number, lon: number): Promise<Station> {
  const r = await fetch(`${API}/places/reverse?lat=${lat}&lon=${lon}&limit=20&radiusMeters=2000`);
  const d = await r.json();
  const sta: Station | undefined = (d.places || []).find((x: Station) => x.kind === "station");
  if (!sta) throw new Error("2km以内に駅なし");
  return sta;
}

/** 駅間の電車経路を最大3件取得する */
export async function fetchJourneys(from: Station, to: Station): Promise<Journey[]> {
  const url = `${API}/plan?from=${encodeURIComponent(from.endpoint)}&to=${encodeURIComponent(to.endpoint)}` +
    `&fromLabel=${encodeURIComponent(from.name)}&toLabel=${encodeURIComponent(to.name)}` +
    `&allowModes=rail&numItineraries=3`;
  const r = await fetch(url);
  if (!r.ok) throw new Error("API error " + r.status);
  const d = await r.json();
  return (d.journeys || []).slice(0, 3);
}
