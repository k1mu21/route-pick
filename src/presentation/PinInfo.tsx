import type { UseQueryResult } from "@tanstack/react-query";
import type { Pin, Station } from "../domain/types.ts";

interface Props {
  pin: Pin | null;
  station: UseQueryResult<Station, Error>;
  label: string;
}

export function PinInfo({ pin, station, label }: Readonly<Props>) {
  return (
    <div className="pin-info">
      <b>{label}:</b> {pin ? `${pin.lat.toFixed(5)}, ${pin.lon.toFixed(5)}` : "未設定"}<br />
      <b>最寄駅:</b>{" "}
      {!pin
        ? "-"
        : station.data
        ? `${station.data.name}（${Math.round(station.data.distanceMeters)}m）`
        : station.error
        ? `取得失敗: ${station.error.message}`
        : "検索中…"}
    </div>
  );
}
