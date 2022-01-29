// import moment from 'moment';

export const between = (x: number, min: number, max: number) => {
  return x >= min && x <= max;
};

// export type FilterValue = CheckboxValueType[] | string[] | TypeOfAsset[] | Technology[] |  [number, number] | number | boolean | string | moment.Moment | null
// export type RegionName = "worldwide" | "northAmerica" | "southAmerica" | "europe" | "asia" | "africa" | "middleEast"
// interface Region {
//   value: string
//   defaultZoom: number
//   defaultCenter: {
//     lat: number
//     lng: number
//   }
//   countries: string[]
// }

// export interface FilterParameters {
//   expectedProductionRange: [number, number] | undefined
//   projectCapacityRange: [number, number] | undefined
//   contractMinimumTenorRange: [number, number] | undefined
//   availableForOfftakeRange: [number, number] | undefined
//   regionName: RegionName
//   CODBefore: moment.Moment | null
//   showFavourites: boolean
//   typeOfAsset: TypeOfAsset[]
//   technologies: Technology[]
// }

export const filterByRegion = (region, project) => {
  if (region.value === 'worldwide') {
    return true;
  }
  return region.countries.includes(project.location);
};

export const filterByTypeOfAsset = (filter, project) => {
  if (filter.typeOfAsset.length === 0) {
    return true;
  }
  return filter.typeOfAsset.includes(project.typeOfAsset);
};

export const filterByTechnology = (filter, project) => {
  if (filter.technologies.length === 0) {
    return true;
  }
  return filter.technologies.includes(project.technology);
};

export const filterBySpecialty = (filter, company) => {
  return filter.specialties.every((specialty) =>
    company.specialties.includes(specialty)
  );
};
export const filterBySearchWord = (filter, company) => {
  if (filter.searchWord === '') {
    return true;
  }
  return company.company_name
    .toLowerCase()
    .includes(filter.searchWord.toLowerCase());
};

export const filterCompanies = (initialCompanies, filter) => {
  // if (initialCompanies === undefined || initialCompanies.length === 0) {
  //   return [];
  // }
  return (
    initialCompanies
      // .filter((company) => filterByTypeOfAsset(filter, company))
      // .filter((company) => filterByTechnology(filter, company))
      // .filter((company) => filterBySearchWord(filter, company))
      .filter((company) => filterBySpecialty(filter, company))
  );
};

export const createFilterState = (companies) => {
  // TODO: incorporate these repeated filters using spread operator
  if (companies === undefined || companies.length === 0) {
    return {
      regionName: 'worldwide',
      typeOfAsset: [],
      technologies: [],
      specialties: [],
    };
  }
};
