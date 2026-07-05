export function fmtTime(secs: number): string {
  const h = Math.floor(secs / 3600) % 24, m = Math.floor(secs / 60) % 60;
  return `${h}:${String(m).padStart(2, "0")}`;
}

export function fmtDur(secs: number): string {
  const m = Math.round(secs / 60);
  return m >= 60 ? `${Math.floor(m / 60)}時間${m % 60}分` : `${m}分`;
}
