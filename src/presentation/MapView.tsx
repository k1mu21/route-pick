import { useEffect, useRef } from "react";
import type maplibregl from "maplibre-gl";
import { createMap } from "../infrastructure/map/createMap.ts";

interface Props {
  onClick: (map: maplibregl.Map, lat: number, lng: number) => void;
}

export function MapView({ onClick }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const onClickRef = useRef(onClick);
  onClickRef.current = onClick;

  useEffect(() => {
    const map = createMap(container.current!);
    map.on("click", (e) => onClickRef.current(map, e.lngLat.lat, e.lngLat.lng));
    return () => map.remove();
  }, []);

  return <div id="map" ref={container} />;
}
