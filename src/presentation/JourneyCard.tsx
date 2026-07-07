import type { Journey, Leg, TransitLeg } from "../domain/types.ts";
import { fmtDur, fmtTime } from "../domain/format.ts";

interface Props {
  journey: Journey;
  index: number;
}

export function JourneyCard({ journey, index }: Readonly<Props>) {
  return (
    <div className="card">
      <h3>ルート{index + 1}　{fmtDur(journey.durationSecs)}・乗換{journey.transferCount}回</h3>
      <div className="time">
        {fmtTime(journey.departureSecs)} 発 → {fmtTime(journey.arrivalSecs)} 着
      </div>
      {journey.legs.map((leg, i) =>
        leg.kind === "transit" ? <TransitLegRow leg={leg} key={i} /> : <WalkLegRow leg={leg} key={i} />
      )}
    </div>
  );
}

function TransitLegRow({ leg }: Readonly<{ leg: TransitLeg }>) {
  return (
    <div className="leg" style={{ borderColor: `#${leg.color ?? "999"}` }}>
      <span className="route">{leg.routeName}</span> {leg.headsign ? `（${leg.headsign}）` : ""}
      <br />
      {leg.from?.name} {fmtTime(leg.departureSecs)} → {leg.to?.name} {fmtTime(leg.arrivalSecs)}
    </div>
  );
}

function WalkLegRow({ leg }: Readonly<{ leg: Leg }>) {
  return (
    <div className="leg walk">
      🚶 徒歩 {fmtDur(leg.durationSecs ?? leg.arrivalSecs - leg.departureSecs)}
    </div>
  );
}
