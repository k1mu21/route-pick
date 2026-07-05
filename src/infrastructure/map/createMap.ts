import maplibregl from "maplibre-gl";
import { Protocol } from "pmtiles";
import { mapStyle } from "./mapStyle.ts";

let protocolRegistered = false;

/** PMTiles用のカスタムプロトコルを登録（pmtiles://~~ のURLで protocol.tile が呼ばれる） */
function registerPmtilesProtocol() {
  if (protocolRegistered) return;
  maplibregl.addProtocol("pmtiles", new Protocol().tile);
  protocolRegistered = true;
}

export function createMap(container: HTMLElement): maplibregl.Map {
  registerPmtilesProtocol();
  return new maplibregl.Map({
    container,
    center: [139.7024, 35.6598],
    zoom: 16,
    maxPitch: 85, // 最大の傾き、デフォルトは60
    style: mapStyle,
  });
}
