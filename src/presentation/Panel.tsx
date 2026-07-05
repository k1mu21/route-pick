import type { UseQueryResult } from "@tanstack/react-query";
import type { Journey, Pin, PinKey } from "../domain/types.ts";
import { PinInfo } from "./PinInfo.tsx";
import { JourneyCard } from "./JourneyCard.tsx";

interface Props {
  pins: Record<PinKey, Pin | null>;
  journeys: UseQueryResult<Journey[], Error>;
  canSearch: boolean;
  onSearch: () => void;
}

export function Panel({ pins, journeys, canSearch, onSearch }: Readonly<Props>) {
  return (
    <div id="panel">
      <h1>🚉 Route Pick</h1>
      <div className="hint">
        地図をクリックして出発ピン → 到着ピンの順に設置。ピン間の電車経路を3通り表示します（乗車駅・降車駅は自動で選ばれます）。
      </div>
      <PinInfo pin={pins.from} label="出発" />
      <PinInfo pin={pins.to} label="到着" />
      <button disabled={!canSearch} onClick={onSearch}>経路を検索</button>
      <div className="status">{journeys.error ? "検索失敗: " + journeys.error.message : ""}</div>
      {journeys.isFetching && <div>検索中…</div>}
      {journeys.data?.length === 0 && <div>経路が見つかりませんでした。</div>}
      {journeys.data?.map((j, i) => <JourneyCard journey={j} index={i} key={i} />)}
    </div>
  );
}
