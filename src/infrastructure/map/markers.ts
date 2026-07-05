import maplibregl from "maplibre-gl";
import type { PinKey } from "../../domain/types.ts";

/** 出発/到着ピンの表示を管理する */
export class MarkerStore {
  #markers: Record<string, maplibregl.Marker | undefined> = {};

  setPin(map: maplibregl.Map, key: PinKey, lat: number, lng: number) {
    this.#markers[key]?.remove();
    const marker = new maplibregl.Marker({ color: key === "from" ? "#2f6bff" : "#e0433f" })
      .setLngLat([lng, lat])
      .setPopup(new maplibregl.Popup({ offset: 30 }).setText(key === "from" ? "出発" : "到着"))
      .addTo(map);
    marker.togglePopup();
    this.#markers[key] = marker;
  }
}
