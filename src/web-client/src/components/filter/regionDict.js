// type LatLng = {lat: number, lng: number}

// interface RegionObject {
//   [id: string]: string | number | LatLng | string[]
//   value: string
//   label: string
//   defaultZoom: number
//   defaultCenter: LatLng
//   countries: string[]
// }

// interface RegionDict {
//   [id: string]: RegionObject
//   northAmerica: RegionObject
//   southAmerica: RegionObject
//   europe: RegionObject
//   africa: RegionObject
//   asia: RegionObject
//   middleEast: RegionObject
// }

export const regionDict = {
  worldwide: {
    value: 'worldwide',
    label: 'Worldwide',
    defaultZoom: 2,
    defaultCenter: { lat: 44.52, lng: -55.25 },
    countries: ['XXXX', 'XXXX'], // TODO: What do put here, if anything?
  },
  northAmerica: {
    value: 'northAmerica',
    label: 'North America',
    defaultZoom: 5,
    defaultCenter: { lat: 34.52, lng: -115 },
    countries: ['United States', 'Canada'],
  },
  southAmerica: {
    value: 'southAmerica',
    label: 'South America',
    defaultZoom: 5,
    defaultCenter: { lat: 0, lng: 0 },
    countries: [
      'Mexico',
      'Honduras',
      'Guatamala',
      'El Salvador',
      'Panama',
      'Colombia',
      'Chile',
    ],
  },
  europe: {
    value: 'europe',
    label: 'Europe',
    defaultZoom: 5,
    defaultCenter: { lat: 44.52, lng: -5.25 },
    countries: [
      'United Kingdom',
      'France',
      'Spain',
      'Switzerland',
      'Germany',
      'Italy',
      'Belgium',
      'Portugal',
      'Ireland',
    ],
  },
  africa: {
    value: 'africa',
    label: 'Africa',
    defaultZoom: 5,
    defaultCenter: { lat: 3.3, lng: 13.1 },
    countries: [
      'Rawana',
      'Chad',
      'Nigeria',
      'South Africa',
      'Zambia',
      'Botswana',
      'Benin',
    ],
  },
  asia: {
    value: 'asia',
    label: 'Asia',
    defaultZoom: 5,
    defaultCenter: { lat: 32.1, lng: 99.7 },
    countries: [
      'China',
      'Taiwan',
      'Japan',
      'South Korea',
      'North Korea',
      'Brunei',
      'Nepal',
    ],
  },
  middleEast: {
    value: 'middleEast',
    label: 'Middle East',
    defaultZoom: 5,
    defaultCenter: { lat: 29.7, lng: 49.5 },
    countries: ['Egypt', 'Iraq', 'Iran', 'UAE'],
  },
};

// interface TechnologyObject {
//   [id: string]: string | boolean
//   value: string
//   label: string
//   checked: boolean
// }

// interface TechnologyDict {
//   [id: string]: TechnologyObject
//   solar: TechnologyObject
//   windOffshore: TechnologyObject
//   windOnshore: TechnologyObject
//   hydro: TechnologyObject
//   storage: TechnologyObject
//   biomass: TechnologyObject
//   geoThermal: TechnologyObject
// }

export const technologyDict = {
  solar: { label: 'Solar', value: 'solar', checked: false },
  windOnshore: { label: 'Wind Onshore', value: 'windOnshore', checked: false },
  windOffshore: {
    label: 'Wind Offshore',
    value: 'windOffshore',
    checked: false,
  },
  hydro: { label: 'Hydro', value: 'hydro', checked: false },
  storage: { label: 'Storage', value: 'storage', checked: false },
  biomass: { label: 'Biomass', value: 'biomass', checked: false },
  geoThermal: { label: 'GeoThermal', value: 'geoThermal', checked: false },
};

export const makeOptionsFromDictionary = (dictionary) => {
  const options = Object.keys(dictionary).map((key) => {
    return {
      value: dictionary[key].value,
      label: dictionary[key].label,
    };
  });
  return options;
};

export const makeArrayOfStringsFromDictionary = (dictionary) => {
  const options = Object.keys(dictionary).map((key) => {
    return dictionary[key].value;
  });
  return options;
};
