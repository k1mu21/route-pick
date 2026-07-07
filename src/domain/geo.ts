import type { Pin } from "./types.ts";

/** 2点間の直線距離（km）。ハバーサイン公式による概算 */
export function distanceKm(a: Pin, b: Pin): number {
  const R = 6371; // 地球半径 (km)
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** 距離の表示用フォーマット。1km未満はm表示 */
export function fmtDistance(km: number): string {
  return km < 1 ? `${Math.round(km * 1000)}m` : `${km.toFixed(1)}km`;
}
