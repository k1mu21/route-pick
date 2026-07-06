import type { Pin } from "../domain/types.ts";

interface Props {
  pin: Pin | null;
  label: string;
  active: boolean;
  onSelect: () => void;
}

export function PinInfo({ pin, label, active, onSelect }: Readonly<Props>) {
  return (
    <div className={"pin-info" + (active ? " active" : "")} onClick={onSelect}>
      <b>{label}:</b> {pin ? `${pin.lat.toFixed(5)}, ${pin.lon.toFixed(5)}` : "未設定"}
      {active && <span className="selecting">選択中</span>}
    </div>
  );
}
