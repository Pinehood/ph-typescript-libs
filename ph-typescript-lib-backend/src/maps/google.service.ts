import {
  Client,
  FindPlaceFromTextResponse,
  FindPlaceFromTextResponseData,
  GeocodeResult,
  LatLng,
  LatLngLiteral,
  PlaceData,
  PlaceInputType,
  PlacesNearbyResponse,
  PlacesNearbyResponseData,
  Status,
  TextSearchResponse,
  TextSearchResponseData,
} from "@googlemaps/google-maps-services-js";
import { IService } from "../utils";
import { EDefaults, GM_DEFAULT_PLACE_FIELDS } from "./constants";
import { IGoogleMapsOptions } from "./interfaces";
import { TGoogleMapsPlacesData, TGoogleMapsSearchMode } from "./types";
import { getAll } from "./helpers";

export class GoogleMapsService implements IService<IGoogleMapsOptions, Client> {
  private readonly options: IGoogleMapsOptions;
  private readonly client: Client;

  constructor(options: IGoogleMapsOptions) {
    this.options = options;
    this.client = new Client();
  }

  get config(): IGoogleMapsOptions {
    return this.options;
  }

  get instance(): Client {
    return this.client;
  }

  async getAllPlacesDataByName(
    name: string,
    mode: TGoogleMapsSearchMode,
    region: string,
    location?: LatLngLiteral | null,
  ): Promise<Partial<PlaceData>[]> {
    return getAll<PlaceData>((token: string) =>
      this.getPlacesDataByName(name, mode, region, location, token),
    );
  }

  async getPlaceDetails(
    placeId: string,
    region?: string,
  ): Promise<Partial<PlaceData>> {
    const response = await this.client.placeDetails({
      params: { key: this.options.accessKey, place_id: placeId, region },
    });
    if (
      response &&
      response.status === 200 &&
      response.data &&
      response.data.status === Status.OK
    ) {
      return response.data.result;
    }
    return null;
  }

  async geocodeAddress(
    address: string,
    region?: string,
  ): Promise<GeocodeResult[]> {
    const response = await this.client.geocode({
      params: { key: this.options.accessKey, region, address },
    });
    if (
      response &&
      response.status === 200 &&
      response.data &&
      response.data.results &&
      response.data.status === Status.OK
    ) {
      return response.data.results;
    }
    return null;
  }

  async reverseGeocodeLocation(
    location: LatLngLiteral,
  ): Promise<GeocodeResult[]> {
    const response = await this.client.reverseGeocode({
      params: { key: this.options.accessKey, latlng: location },
    });
    if (
      response &&
      response.status === 200 &&
      response.data &&
      response.data.results &&
      response.data.status === Status.OK
    ) {
      return response.data.results;
    }
    return null;
  }

  async getPlacesDataByName(
    name: string,
    mode: TGoogleMapsSearchMode,
    region: string,
    location?: LatLng,
    pagetoken?: string,
    radiusKm?: number,
  ): Promise<TGoogleMapsPlacesData> {
    let response:
      | TextSearchResponse
      | FindPlaceFromTextResponse
      | PlacesNearbyResponse = null;
    if (mode === "search") {
      response = await this.client.textSearch({
        params: {
          key: this.options.accessKey,
          query: name,
          region,
          pagetoken,
        },
      });
    } else if (mode === "find") {
      response = await this.client.findPlaceFromText({
        params: {
          key: this.options.accessKey,
          input: name,
          inputtype: PlaceInputType.textQuery,
          fields: GM_DEFAULT_PLACE_FIELDS,
        },
      });
    } else if (mode === "nearby") {
      response = await this.client.placesNearby({
        params: {
          key: this.options.accessKey,
          name,
          location,
          radius: radiusKm * 1000 || EDefaults.RADIUS_KM * 1000,
          pagetoken,
        },
      });
    }
    if (
      response &&
      response.status === 200 &&
      response.data &&
      (response.data.status === Status.OK ||
        response.data.status === Status.ZERO_RESULTS)
    ) {
      let results: Partial<PlaceData>[] = [];
      if (mode === "search") {
        const data = response.data as TextSearchResponseData;
        if (data.results && data.results.length > 0) {
          results = data.results;
        }
      } else if (mode === "find") {
        const data = response.data as FindPlaceFromTextResponseData;
        if (data.candidates && data.candidates.length > 0) {
          results = data.candidates;
        }
      } else if (mode === "nearby") {
        const data = response.data as PlacesNearbyResponseData;
        if (data.results && data.results.length > 0) {
          results = data.results;
        }
      }
      return { data: results, token: response.data.next_page_token };
    }
    return null;
  }
}
