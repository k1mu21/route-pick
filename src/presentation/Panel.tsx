import type { UseQueryResult } from "@tanstack/react-query";
import type { Journey, Pin, PinKey, Station } from "../domain/types.ts";
import { PinInfo } from "./PinInfo.tsx";
import { JourneyCard } from "./JourneyCard.tsx";

interface Props {
  pins: Record<PinKey, Pin | null>;
  fromStation: UseQueryResult<Station, Error>;
  toStation: UseQueryResult<Station, Error>;
  journeys: UseQueryResult<Journey[], Error>;
  canSearch: boolean;
  onSearch: () => void;
}

export function Panel({ pins, fromStation, toStation, journeys, canSearch, onSearch }: Readonly<Props>) {
  return (
    <div id="panel">
      <h1>🚉 Route Pick</h1>
      <div className="hint">
        地図をクリックして出発ピン → 到着ピンの順に設置。各ピンの最寄り駅間の電車経路を3通り表示します。
      </div>
      <PinInfo pin={pins.from} station={fromStation} label="出発" />
      <PinInfo pin={pins.to} station={toStation} label="到着" />
      <button disabled={!canSearch} onClick={onSearch}>経路を検索</button>
      <div className="status">{journeys.error ? "検索失敗: " + journeys.error.message : ""}</div>
      {journeys.isFetching && <div>検索中…</div>}
      {journeys.data?.length === 0 && <div>経路が見つかりませんでした。</div>}
      {journeys.data?.map((j, i) => <JourneyCard journey={j} index={i} key={i} />)}
    </div>
  );
}
