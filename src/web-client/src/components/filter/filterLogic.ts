import moment from 'moment'
import { ProjectMarker, Technology, TypeOfAsset } from "../../../../../typings/server"
import { CheckboxValueType } from 'antd/lib/checkbox/Group'

export const between = (x: number, min: number, max: number) => {
  return x >= min && x <= max
}

export type FilterValue = CheckboxValueType[] | string[] | TypeOfAsset[] | Technology[] |  [number, number] | number | boolean | string | moment.Moment | null
export type RegionName = "worldwide" | "northAmerica" | "southAmerica" | "europe" | "asia" | "africa" | "middleEast"
interface Region {
  value: string
  defaultZoom: number
  defaultCenter: {
    lat: number
    lng: number
  }
  countries: string[]
}


export interface FilterParameters {
  expectedProductionRange: [number, number] | undefined
  projectCapacityRange: [number, number] | undefined
  contractMinimumTenorRange: [number, number] | undefined
  availableForOfftakeRange: [number, number] | undefined 
  regionName: RegionName
  CODBefore: moment.Moment | null 
  showFavourites: boolean 
  typeOfAsset: TypeOfAsset[]  
  technologies: Technology[] 
}

export const filterByRegion = (region: Region, project: ProjectMarker) => {
  if (region.value === 'worldwide')  {
    return true
  }
  return region.countries.includes(project.location)
}

export const filterByAvailableForOfftake = (filter: FilterParameters, project: ProjectMarker) => {
	if (!filter.availableForOfftakeRange) {
		return true
	}
  return between(
    project.availableShare,
    filter.availableForOfftakeRange[0],
    filter.availableForOfftakeRange[1]
  )
}

// HINT: If !filter.CODBefore, it shows all
export const filterByCODBefore = (filter: FilterParameters, project: ProjectMarker) => {
  if (!filter.CODBefore) {
    return true
  } 
  return moment(project.COD).isBefore(filter.CODBefore)
}
// HINT: If !filter.showFavourites, it shows all
export const filterByFavourite = (filter: FilterParameters, project: ProjectMarker) => {
  if (!filter.showFavourites) {
    return true
  }
  return project.favourite
}
export const filterByContractMinimumTenor = (filter: FilterParameters, project: ProjectMarker) => {
	if (!filter.contractMinimumTenorRange) {
		return true
	}
  return between(
    project.contractMinimumTenor,
    filter.contractMinimumTenorRange[0],
    filter.contractMinimumTenorRange[1]
  )
}
export const filterByExpectedProduction = (filter: FilterParameters, project: ProjectMarker) => {
	if (!filter.expectedProductionRange) {
		return true
	}
  return between(
    project.expectedProduction,
    filter.expectedProductionRange[0],
    filter.expectedProductionRange[1]
  )
}
export const filterByProjectCapacity = (filter: FilterParameters, project: ProjectMarker) => {
	if (!filter.projectCapacityRange) {
		return true
	}
  return between(
    project.projectCapacity,
    filter.projectCapacityRange[0],
    filter.projectCapacityRange[1]
  )
}
export const filterByTypeOfAsset = (filter: FilterParameters, project: ProjectMarker) => {
  if (filter.typeOfAsset.length === 0)  {
    return true 
  }
  return filter.typeOfAsset.includes(project.typeOfAsset)
}

export const filterByTechnology = (filter: FilterParameters, project: ProjectMarker) => {
  if (filter.technologies.length === 0) {
    return true
  }
  return filter.technologies.includes(project.technology)
}

export const filterProjects = (initialProjects: ProjectMarker[], filter: FilterParameters, region: any ) => {
	return initialProjects.filter(project => filterByRegion(region, project))
		.filter(project => filterByAvailableForOfftake(filter, project))
		.filter(project => filterByCODBefore(filter, project))
		.filter(project => filterByFavourite(filter, project))
		.filter(project => filterByContractMinimumTenor(filter, project))
		.filter(project => filterByExpectedProduction(filter, project))
		.filter(project => filterByProjectCapacity(filter, project))
		.filter(project => filterByTypeOfAsset(filter, project))
		.filter(project => filterByTechnology(filter, project))
  }
	
export const calculateMaxProjectValue = (projects: ProjectMarker[], field: 'contractMinimumTenor' | 'expectedProduction' | 'projectCapacity' | 'availableShare' ) => {
    return Math.max(
      ...projects.map((project: ProjectMarker) => project[field]),
      0
    )
}

export const calculateMaxParameters = (projects: ProjectMarker[]) => {
  return {
    expectedProduction: calculateMaxProjectValue(projects, 'expectedProduction'),
    projectCapacity: calculateMaxProjectValue(projects, 'projectCapacity'),
    contractMinimumTenor: calculateMaxProjectValue(projects, 'contractMinimumTenor'),
    availableForOfftake: calculateMaxProjectValue(projects, 'availableShare'),
  }
}

export const createFilterState = (projects: ProjectMarker[] | undefined): FilterParameters => {
  // TODO: incorporate these repeated filters using spread operator
  if (projects === undefined || projects.length === 0) {
    return {
      // ...nonSliderInitialState,
			expectedProductionRange: undefined,
			projectCapacityRange: undefined,
			contractMinimumTenorRange: undefined,
			availableForOfftakeRange: undefined,
      regionName: 'worldwide',
      CODBefore: null,
      showFavourites: false,
      typeOfAsset: [],
      technologies: [],
    }
  }

  const maxValues = calculateMaxParameters(projects);
  return {
			expectedProductionRange: [0, maxValues.expectedProduction],
			projectCapacityRange: [0, maxValues.projectCapacity],
			contractMinimumTenorRange: [1, maxValues.contractMinimumTenor],
			availableForOfftakeRange: [0, maxValues.availableForOfftake],
      regionName: 'worldwide',
      CODBefore: null,
      showFavourites: false,
      typeOfAsset: [],
      technologies: [],
  }
}

