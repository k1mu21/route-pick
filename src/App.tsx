import { useRoutePick } from "./application/useRoutePick.ts";
import { MapView } from "./presentation/MapView.tsx";
import { Panel } from "./presentation/Panel.tsx";

export default function App() {
  const { pins, active, setActive, journeys, canSearch, placePin, search } = useRoutePick();

  return (
    <>
      <MapView onClick={placePin} />
      <Panel
        pins={pins}
        active={active}
        onSelect={setActive}
        journeys={journeys}
        canSearch={canSearch}
        onSearch={search}
      />
    </>
  );
}
