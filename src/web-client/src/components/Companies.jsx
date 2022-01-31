import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import api from '../utils/axiosConfig';
import { Company } from './Company';
import { createFilterState, filterCompanies } from './filter/filterLogic';

const CompaniesContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1 0 auto;
`;
const Header = styled.div`
  background-color: white;
  height: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Page = styled.div`
  display: flex;
  width: 100%;
`;
const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 300px;
  background: red;
  padding: 10px;
  font-size: 11px;
`;

export function Companies() {
  const [filter, setFilter] = useState({
    typeOfAsset: [],
    technologies: [],
    specialties: [],
    searchWord: '',
  });
  const [initialCompanies, setInitialCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // strip out all specialties to display checkbox options
  const allSpecialties = useMemo(() => {
    const specialtiesAccum = [];
    initialCompanies.forEach((company) => {
      company.specialties.forEach((specialty) => {
        if (!specialtiesAccum.includes(specialty)) {
          specialtiesAccum.push(specialty);
        }
      });
    });
    return specialtiesAccum;
  }, [initialCompanies]);

  // TODO: add checkboxs for all specialties

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/api/company');
        console.log('response.data :>> ', response.data);
        if (response.data) {
          setInitialCompanies(response.data);
        }

        setIsLoading(false);
      } catch (ex) {
        console.error(ex);
      }
    })();
  }, []);

  const handleSearch = (event) => {
    console.log('event.target.value :>> ', event.target.value);
    setFilter((prev) => ({ ...prev, searchWord: event.target.value }));
  };

  const filteredCompanies = useMemo(() => {
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
        <input type="text" placeholder="Search..." onChange={handleSearch} />
      </Header>
      <Page>
        {!isLoading && (
          <Sidebar>
            {allSpecialties &&
              allSpecialties.map((specialty) => (
                <>
                  <label key={specialty} htmlFor={specialty}>
                    <input
                      id={specialty}
                      name={specialty}
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
                    {specialty}
                  </label>
                </>
              ))}
          </Sidebar>
        )}
        <CompaniesContainer>{content}</CompaniesContainer>
      </Page>
    </>
  );
}
