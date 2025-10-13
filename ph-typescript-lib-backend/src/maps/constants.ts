export const EDefaults = {
  RADIUS_KM: 5,
  REQUEST_DELAY_S: 5,
  PLACE_FIELDS: [
    "address_component",
    "adr_address",
    "formatted_address",
    "name",
  ],
} as const;

export const GM_DEFAULT_PLACE_FIELDS = [
  "address_component",
  "adr_address",
  "formatted_address",
  "name",
];
