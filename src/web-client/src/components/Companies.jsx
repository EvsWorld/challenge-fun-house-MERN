import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import api from '../utils/axiosConfig';
import { CenterSmallLayout } from './Layouts';
import { Company } from './Company';
import { createFilterState, filterCompanies } from './filter/filterLogic';

const CompaniesContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  transition: 1s all ease-in;
`;
const Header = styled.div`
  background-color: white;
  min-height: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export function Companies() {
  const [filter, setFilter] = useState({
    typeOfAsset: [],
    technologies: [],
    specialties: [],
    searchWord: '',
  });
  const [initialCompanies, setInitialCompanies] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [specialties, setSpecialties] = useState([]);
  const [specialtiesFilter, setSpecialtiesFilter] = useState([]);

  // strip out all specialties and put in state
  // TODO: memoize
  const composeAllSpecialties = (companiesData) => {
    const specialtiesAccum = [];
    companiesData.forEach((company) => {
      company.specialties.forEach((specialty) => {
        if (!specialtiesAccum.includes(specialty)) {
          specialtiesAccum.push(specialty);
        }
      });
      setSpecialties(specialtiesAccum);
    });
  };
  // TODO: add checkboxs for all specialties

  // TODO: add filter function to checkboxes

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/api/company');
        console.log('response.data :>> ', response.data);
        if (response.data) {
          setInitialCompanies(response.data);
          composeAllSpecialties(response.data);
          // searchWord === '' && setFilteredCompanies(response.data);
        }

        setIsLoading(false);
      } catch (ex) {
        console.error(ex);
      }
    })();
  }, []);

  const handleFilter = (event) => {
    console.log('event.target.value :>> ', event.target.value);
    // setSearchWord(event.target.value);

    setFilter({ ...filter, searchWord: event.target.value });

    // const newFilter = filteredCompanies.filter((company) => {
    //   return company.company_name
    //     .toLowerCase()
    //     .includes(searchWord.toLowerCase());
    // });
    // console.log('newFilter :>> ', newFilter);
    // searchWord === ''
    //   ? setFilteredCompanies(filteredCompanies)
    //   : setFilteredCompanies(newFilter);
  };

  const filteredCompanies = useMemo(() => {
    // const selectedRegion = regionDict[filter.regionName]
    return filterCompanies(initialCompanies, filter);
  }, [filter, initialCompanies]);

  const content = isLoading ? (
    // TODO: format loader
    <div>Loading...</div>
  ) : (
    filteredCompanies &&
    filteredCompanies.map((company) => (
      <Company {...company} key={company.id} />
    ))
  );

  return (
    <>
      <Header>
        <input type="text" placeholder="Search..." onChange={handleFilter} />
        {specialties &&
          specialties.map((specialty) => (
            <label>
              <input
                type="checkbox"
                checked={filter.specialties.includes(specialty)}
                onChange={(e) => {
                  const checked = filter.specialties.includes(specialty);
                  setFilter((prev) => ({
                    ...prev,
                    specialties: checked
                      ? prev.specialties.filter((sc) => sc !== specialty)
                      : [...prev.specialties, specialty],
                  }));
                }}
              />
            </label>
          ))}
      </Header>
      <CompaniesContainer>{content}</CompaniesContainer>
    </>
  );
}
