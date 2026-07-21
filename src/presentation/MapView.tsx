import { useEffect, useRef } from "react";
import type maplibregl from "maplibre-gl";
import { createMap } from "../infrastructure/map/createMap.ts";

interface Props {
  onClick: (map: maplibregl.Map, lat: number, lng: number) => void;
}

export function MapView({ onClick }: Readonly<Props>) {
  const container = useRef<HTMLDivElement>(null);
  // 最新の onClick を参照させ、マップの再生成を避ける
  const onClickRef = useRef(onClick);
  useEffect(() => {
    onClickRef.current = onClick;
  }, [onClick]);

  useEffect(() => {
    if (!container.current) return;
    const map = createMap(container.current);
    map.on("click", (e) => onClickRef.current(map, e.lngLat.lat, e.lngLat.lng));
    return () => map.remove();
  }, []);

  return <div id="map" ref={container} />;
}
