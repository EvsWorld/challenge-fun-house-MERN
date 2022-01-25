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

export function Companies() {
  const [companies, setCompanies] = useState(undefined);

  useEffect(() => {
    (async () => {
      try {
        const submissions = await api.get('/api/company');
        console.log('submissions.data :>> ', submissions.data);
        setCompanies(submissions.data);
      } catch (ex) {
        console.error(ex);
      }
    })();
  }, []);

  let content;

  content =
    companies &&
    companies.map((company) => <Company {...company} key={company.id} />);
  return <CompaniesContainer>{content}</CompaniesContainer>;
}
