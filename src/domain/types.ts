export type PinKey = "from" | "to";

export interface Pin {
  lat: number;
  lon: number;
}

interface LegBase {
  departureSecs: number;
  arrivalSecs: number;
  durationSecs?: number;
}

export interface TransitLeg extends LegBase {
  kind: "transit";
  routeName?: string;
  headsign?: string;
  color?: string;
  from?: { name: string };
  to?: { name: string };
}

export interface WalkLeg extends LegBase {
  kind: "walk";
}

export type Leg = TransitLeg | WalkLeg;

export interface Journey {
  durationSecs: number;
  transferCount: number;
  departureSecs: number;
  arrivalSecs: number;
  legs: Leg[];
}
