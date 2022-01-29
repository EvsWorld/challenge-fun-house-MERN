import styled from 'styled-components';
import { FilterParameters, FilterValue } from './filterLogic';
// import { FilterSlider } from './FilterSlider';
import { CODFilter } from './CODFilter';
import { FavouriteFilterCheckbox } from './FavouriteFilterCheckbox';
import { RegionDropdown } from './RegionDropdown';
import { TechnologyFilter } from './TechnologyFilter';
import { TypeOfAssetFilterCheckboxes } from './TypeOfAssetFilterCheckboxes';

const FilterContainer = styled.div`
  display: flex;
  margin: 20px 200px 0 200px;
  border: 1px solid red;
  // width: 100%;
  justify-content: space-between;
`;
const FilterRow = styled.div`
  border: 1px solid green;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // align-items: center;
`;
const FirstColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
`;
const SecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-around;
`;
const FilterItem = styled.div`
  // border: 1px solid white;
  color: white;
  height: 40px;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 11px;
  line-height: 0.7;
`;
const LeftFilterItem = styled(FilterItem)`
  // width: 153px;
  width: 100%;
`;
const ResetFilterItem = styled(FilterItem)`
  width: 100%;
  cursor: pointer;
`;

const ExampleListItem = styled(FilterItem)`
  width: 256px;
`;
const RightFilterItem = styled(FilterItem)`
  width: 100px;
`;

const TypeOfAssetCheckboxItem = styled(FilterItem)`
  width: 250px;
`;

// export interface FilterProps {
//   onChange: (filterObj: FilterParameters) => void;
//   filter: FilterParameters;
//   maxAvailableForOfftake: number;
//   maxContractMinimumTenor: number;
//   onResetFilters: () => void;
//   maxExpectedProduction: number;
//   maxProjectCapacity: number;
//   selectedRegion: any;
// }

export function Filter({
  onChange,
  filter,
  maxAvailableForOfftake,
  maxContractMinimumTenor,
  onResetFilters,
  maxExpectedProduction,
  maxProjectCapacity,
  selectedRegion,
}) {
  const onFilterChange = (name, value) => {
    onChange({ ...filter, [name]: value });
  };

  return (
    <FilterContainer showDummy={true}>
      <FirstColumn>
        <FilterRow>
          <LeftFilterItem>Search</LeftFilterItem>
        </FilterRow>
        <FilterRow>
          <ResetFilterItem onClick={onResetFilters}>
            Reset all filters
          </ResetFilterItem>
        </FilterRow>
        <FilterRow>
          <LeftFilterItem> Technology</LeftFilterItem>
        </FilterRow>
      </FirstColumn>
      <SecondColumn>
        <FilterRow>
          <ExampleListItem>
            <RegionDropdown
              selectedRegion={selectedRegion}
              onChange={(x) => onFilterChange('regionName', x)}
            />
          </ExampleListItem>
          <ExampleListItem>
            <div> Available For Offtake </div>
            {/* <FilterSlider
              onChange={(x) => onFilterChange('availableForOfftakeRange', x)}
              max={maxAvailableForOfftake}
              value={filter.availableForOfftakeRange}
            /> */}
          </ExampleListItem>
          <ExampleListItem>
            <div>COD Before</div>
            <CODFilter
              value={filter.CODBefore}
              onChange={(x) => onFilterChange('CODBefore', x)}
            />
          </ExampleListItem>
          <RightFilterItem>
            <FavouriteFilterCheckbox
              value={filter.showFavourites}
              onChange={(x) => onFilterChange('showFavourites', x)}
            />
          </RightFilterItem>
          <RightFilterItem> More filters</RightFilterItem>
        </FilterRow>
        <FilterRow>
          <ExampleListItem>
            <div>Contract Minimum Tenor</div>
            {/* <FilterSlider
              onChange={(x) => onFilterChange('contractMinimumTenorRange', x)}
              max={maxContractMinimumTenor}
              min={1}
              value={filter.contractMinimumTenorRange}
            /> */}
          </ExampleListItem>
          <ExampleListItem>
            <div>Expected Production</div>
            {/* <FilterSlider
              onChange={(x) => onFilterChange('expectedProductionRange', x)}
              max={maxExpectedProduction}
              min={0}
              value={filter.expectedProductionRange}
            /> */}
          </ExampleListItem>
          <ExampleListItem>
            <div>Project Capacity</div>
            {/* <FilterSlider
              onChange={(x) => onFilterChange('projectCapacityRange', x)}
              max={maxProjectCapacity}
              min={0}
              value={filter.projectCapacityRange}
            /> */}
          </ExampleListItem>
          <TypeOfAssetCheckboxItem>
            <div>Type of Asset</div>
            <TypeOfAssetFilterCheckboxes
              options={['Operational', 'New build']}
              value={filter.typeOfAsset}
              onChange={(x) => onFilterChange('typeOfAsset', x)}
            />
          </TypeOfAssetCheckboxItem>
        </FilterRow>
        <FilterRow>
          <TechnologyFilter
            technologies={filter.technologies}
            onChange={(x) => onFilterChange('technologies', x)}
          />
        </FilterRow>
      </SecondColumn>
    </FilterContainer>
  );
}
