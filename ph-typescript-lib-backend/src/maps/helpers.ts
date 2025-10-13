import { LatLngLiteral } from "@googlemaps/google-maps-services-js";
import { EDefaults } from "./constants";

export const getAll = async <T>(
  method: (token: string) => Promise<{ data: Partial<T>[]; token: string }>,
  delay?: number,
): Promise<Partial<T>[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      let token: string = null;
      let results: Partial<T>[] = [];
      const inner = async () => {
        const result = await method(token);
        if (result) {
          if (result.data) {
            results = results.concat(result.data);
          }
          if (result.token) {
            token = result.token;
            setTimeout(
              async () => {
                await inner();
              },
              delay * 1000 || EDefaults.REQUEST_DELAY_S * 1000,
            );
          } else {
            resolve(results);
          }
        }
      };
      await inner();
    } catch (error: any) {
      reject();
    }
  });
};

export const isPlaceInArea = (
  place: LatLngLiteral,
  areaCenter: LatLngLiteral,
  areaRadiusMeters: number,
): boolean => {
  const dLat = ((place.lat - areaCenter.lat) * Math.PI) / 180;
  const dLon = ((place.lng - areaCenter.lng) * Math.PI) / 180;
  const a =
    0.5 -
    Math.cos(dLat) / 2 +
    (Math.cos((areaCenter.lat * Math.PI) / 180) *
      Math.cos((place.lat * Math.PI) / 180) *
      (1 - Math.cos(dLon))) /
      2;
  const distance = Math.abs(Math.round(6371000 * 2 * Math.asin(Math.sqrt(a))));
  return distance <= areaRadiusMeters;
};
