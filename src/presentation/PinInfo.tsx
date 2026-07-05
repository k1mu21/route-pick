import type { Pin } from "../domain/types.ts";

interface Props {
  pin: Pin | null;
  label: string;
}

export function PinInfo({ pin, label }: Readonly<Props>) {
  return (
    <div className="pin-info">
      <b>{label}:</b> {pin ? `${pin.lat.toFixed(5)}, ${pin.lon.toFixed(5)}` : "未設定"}
    </div>
  );
}
