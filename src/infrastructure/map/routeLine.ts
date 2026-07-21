import type maplibregl from "maplibre-gl";
import type { Pin } from "../../domain/types.ts";

const SOURCE_ID = "route-line";

function lineData(from: Pin, to: Pin) {
  return {
    type: "Feature" as const,
    properties: {},
    geometry: {
      type: "LineString" as const,
      coordinates: [[from.lon, from.lat], [to.lon, to.lat]],
    },
  };
}

/** 出発・到着ピンを結ぶ直線を描画・更新する */
export class RouteLine {
  draw(map: maplibregl.Map, from: Pin, to: Pin) {
    const data = lineData(from, to);
    const source = map.getSource(SOURCE_ID) as maplibregl.GeoJSONSource | undefined;
    if (source) {
      source.setData(data);
      return;
    }
    map.addSource(SOURCE_ID, { type: "geojson", data });
    map.addLayer({
      id: SOURCE_ID,
      type: "line",
      source: SOURCE_ID,
      layout: { "line-cap": "round", "line-join": "round" },
      paint: { "line-color": "#2f6bff", "line-width": 3, "line-dasharray": [2, 2] },
    });
  }
}
