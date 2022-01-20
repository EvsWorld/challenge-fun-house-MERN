import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import api from '../utils/axiosConfig';
import { CenterSmallLayout } from '../components/Layouts';
import { Company } from './Company';

const CharactersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  transition: 1s all ease-in;
  max-width: 1200px;
`;

export function CharactersNoRedux() {
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
  return <CharactersContainer>{content}</CharactersContainer>;
}
