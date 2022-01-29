import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import api from '../utils/axiosConfig';
import { CenterSmallLayout } from './Layouts';
import { Company } from './Company';

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export function Companies() {
  const [companies, setCompanies] = useState(undefined);
  const [searchWord, setSearchWord] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]);
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
          setCompanies(response.data);
          composeAllSpecialties(response.data);
          // searchWord === '' && setFilteredCompanies(response.data);
          setFilteredCompanies(response.data);
        }

        setIsLoading(false);
      } catch (ex) {
        console.error(ex);
      }
    })();
  }, []);

  const handleFilter = (event) => {
    console.log('event.target.value :>> ', event.target.value);
    setSearchWord(event.target.value);
    const newFilter = filteredCompanies.filter((company) => {
      return company.company_name
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });
    console.log('newFilter :>> ', newFilter);
    searchWord === ''
      ? setFilteredCompanies(filteredCompanies)
      : setFilteredCompanies(newFilter);
  };

  // const companyHasSpecialty = prevFilteredCompanies.specialties.some(specialty => specialtiesFilter.includes(specialty) );

  // TODO: filter companies for only ones in specialtiesFilter array,
  // then set in state with setFilteredCompanies()
  // setFilteredCompanies((prevFilteredCompanies) => {
  //   console.log('prevFilteredCompanies :>> ', prevFilteredCompanies);
  //   return !checked ? prevFilteredCompanies.filter((company) =>
  //     company.specialties.some((specialty) =>
  //       specialtiesFilter.includes(specialty)
  //     )                     );
  const content = isLoading ? (
    // TODO: format loader
    <div>Loading...</div>
  ) : (
    filteredCompanies
      .filter((company) => {
        return specialtiesFilter.every((specialty) =>
          company.specialties.includes(specialty)
        );
      })
      // .filter((company) => {
      //   return company.company_name
      //     .toLowerCase()
      //     .includes(searchWord.toLowerCase());
      // })
      .map((company) => <Company {...company} key={company.id} />)
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
                checked={specialtiesFilter.includes(specialty)}
                onChange={(e) => {
                  const checked = specialtiesFilter.includes(specialty);
                  setSpecialtiesFilter((prev) =>
                    checked
                      ? prev.filter((sc) => sc !== specialty)
                      : [...prev, specialty]
                  );
                }}
              />
            </label>
          ))}
      </Header>
      <CompaniesContainer>{content}</CompaniesContainer>
    </>
  );
}
