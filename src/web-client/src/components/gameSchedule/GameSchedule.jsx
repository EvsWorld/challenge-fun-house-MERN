import React, { useEffect, useState, Fragment } from 'react';
import styled from 'styled-components';
import api from '../../utils/axiosConfig';
import { Month } from './Month';
import ClipLoader from 'react-spinners/ClipLoader';
import { CenterSmallLayout } from '../../components/Layouts';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  font-size: 2em;
  font-weight: bold;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 15px;
`;
const Months = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1 0 auto;
`;

export const GameSchedule = () => {
  const [months, setMonths] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/api/schedules`);
        if (response.data) {
          setMonths(response.data);
        }

        setIsLoading(false);
      } catch (ex) {
        console.error(ex);
      }
    })();
  }, []);

  return (
    <>
      {isLoading && months?.length === 0 ? (
        <CenterSmallLayout>
          <ClipLoader size={150} color={'#123abc'} loading={true} />
        </CenterSmallLayout>
      ) : (
        <Container>
          <Header> Schedule</Header>
          <Months>
            {months.map((month) => (
              <Month month={month} />
            ))}
          </Months>
        </Container>
      )}
    </>
  );
};
