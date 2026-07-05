export type PinKey = "from" | "to";

export interface Station {
  name: string;
  lat: number;
  lon: number;
  distanceMeters: number;
  endpoint: string;
  kind: string;
}

export interface Pin {
  lat: number;
  lon: number;
}

export interface Leg {
  kind: "transit" | "walk";
  routeName?: string;
  headsign?: string;
  color?: string;
  from?: { name: string };
  to?: { name: string };
  departureSecs: number;
  arrivalSecs: number;
  durationSecs?: number;
}

export interface Journey {
  durationSecs: number;
  transferCount: number;
  departureSecs: number;
  arrivalSecs: number;
  legs: Leg[];
}
