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

  // strip out all specialties and put in state
  const composeAllSpecialties = (companiesData) => {
    companiesData.forEach((company) => {
      company.specialties.forEach((specialty) => {
        if (!specialties.includes(specialty)) {
          setSpecialties((specialties) => [...specialties, specialty]);
        }
      });
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
          searchWord === '' && setFilteredCompanies(response.data);
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
    const newFilter = companies.filter((company) => {
      return company.company_name
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });
    searchWord === '' && setFilteredCompanies(companies);
    console.log('newFilter :>> ', newFilter);
    setFilteredCompanies(newFilter);
  };

  const content = isLoading ? (
    // TODO: format loader
    <div>Loading...</div>
  ) : (
    filteredCompanies.map((company) => (
      <Company {...company} key={company.id} />
    ))
  );

  return (
    <>
      <Header>
        <input type="text" placeholder="Search..." onChange={handleFilter} />
      </Header>
      <CompaniesContainer>{content}</CompaniesContainer>
    </>
  );
}
