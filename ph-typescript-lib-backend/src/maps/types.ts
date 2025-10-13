import { PlaceData } from "@googlemaps/google-maps-services-js";

export type TGoogleMapsSearchMode = "search" | "find" | "nearby";

export type TGoogleMapsPlacesData = {
  data: Partial<PlaceData>[];
  token: string;
};
