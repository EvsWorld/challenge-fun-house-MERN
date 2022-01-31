// import moment from 'moment';

export const between = (x: number, min: number, max: number) => {
  return x >= min && x <= max;
};

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
  return company.company_name
    .toLowerCase()
    .includes(filter.searchWord.toLowerCase());
};

export const filterCompanies = (companies, filter) => {
  // if (companies === undefined || companies.length === 0) {
  //   return [];
  // }
  return (
    companies
      // .filter((company) => filterByTypeOfAsset(filter, company))
      // .filter((company) => filterByTechnology(filter, company))
      .filter((company) => filterBySearchWord(filter, company))
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
