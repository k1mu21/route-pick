import type { Journey } from "../domain/types.ts";
import { fmtDur, fmtTime } from "../domain/format.ts";

interface Props {
  journey: Journey;
  index: number;
}

export function JourneyCard({ journey: j, index }: Props) {
  return (
    <div className="card">
      <h3>ルート{index + 1}　{fmtDur(j.durationSecs)}・乗換{j.transferCount}回</h3>
      <div className="time">{fmtTime(j.departureSecs)} 発 → {fmtTime(j.arrivalSecs)} 着</div>
      {j.legs.map((l, li) =>
        l.kind === "transit" ? (
          <div className="leg" key={li} style={{ borderColor: "#" + (l.color || "999") }}>
            <span className="route">{l.routeName}</span> {l.headsign ? `（${l.headsign}）` : ""}<br />
            {l.from?.name} {fmtTime(l.departureSecs)} → {l.to?.name} {fmtTime(l.arrivalSecs)}
          </div>
        ) : (
          <div className="leg walk" key={li}>
            🚶 徒歩 {fmtDur(l.durationSecs || (l.arrivalSecs - l.departureSecs))}
          </div>
        )
      )}
    </div>
  );
}
