import { useRoutePick } from "./application/useRoutePick.ts";
import { MapView } from "./presentation/MapView.tsx";
import { Panel } from "./presentation/Panel.tsx";

export default function App() {
  const { pins, fromStation, toStation, journeys, canSearch, placePin, search } = useRoutePick();

  return (
    <>
      <MapView onClick={placePin} />
      <Panel
        pins={pins}
        fromStation={fromStation}
        toStation={toStation}
        journeys={journeys}
        canSearch={canSearch}
        onSearch={search}
      />
    </>
  );
}
