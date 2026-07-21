import type { Pin } from "../domain/types.ts";

interface Props {
  pin: Pin | null;
  label: string;
  active: boolean;
  onSelect: () => void;
}

export function PinInfo({ pin, label, active, onSelect }: Readonly<Props>) {
  return (
    <button
      type="button"
      className={active ? "pin-info active" : "pin-info"}
      onClick={onSelect}
      aria-pressed={active}
    >
      <b>{label}:</b> {pin ? `${pin.lat.toFixed(5)}, ${pin.lon.toFixed(5)}` : "未設定"}
      {active && <span className="selecting">選択中</span>}
    </button>
  );
}
