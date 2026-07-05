import maplibregl from "maplibre-gl";
import type { PinKey, Station } from "../../domain/types.ts";

function stationElement(name: string): HTMLDivElement {
  const el = document.createElement("div");
  el.textContent = "🚉";
  el.style.fontSize = "22px";
  el.title = "最寄駅: " + name;
  return el;
}

/** 出発/到着ピンと最寄駅マーカーの表示を管理する */
export class MarkerStore {
  #markers: Record<string, maplibregl.Marker | undefined> = {};

  setPin(map: maplibregl.Map, key: PinKey, lat: number, lng: number) {
    this.#markers[key]?.remove();
    this.#markers[key + "Sta"]?.remove();
    this.#markers[key + "Sta"] = undefined;
    const marker = new maplibregl.Marker({ color: key === "from" ? "#2f6bff" : "#e0433f" })
      .setLngLat([lng, lat])
      .setPopup(new maplibregl.Popup({ offset: 30 }).setText(key === "from" ? "出発" : "到着"))
      .addTo(map);
    marker.togglePopup();
    this.#markers[key] = marker;
  }

  setStation(map: maplibregl.Map, key: PinKey, sta: Station) {
    this.#markers[key + "Sta"]?.remove();
    this.#markers[key + "Sta"] = new maplibregl.Marker({ element: stationElement(sta.name) })
      .setLngLat([sta.lon, sta.lat])
      .setPopup(new maplibregl.Popup({ offset: 15 }).setText("最寄駅: " + sta.name))
      .addTo(map);
  }
}
