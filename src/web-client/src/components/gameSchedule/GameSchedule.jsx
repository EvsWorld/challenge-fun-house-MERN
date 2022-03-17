import React, { useEffect, useState, Fragment } from 'react';
import styled from 'styled-components';
import api from '../../utils/axiosConfig';
import { Month } from './Month';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.h1`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 20px;
`;
const Months = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1 0 auto;
`;

export const GameSchedule = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/api/schedule`);
        if (response.data) {
          setGames(response.data);
        }

        setIsLoading(false);
      } catch (ex) {
        console.error(ex);
      }
    })();
  }, []);

  console.log('games :>> ', games);
  return (
    <>
      {isLoading && games?.length === 0 ? (
        <h2>Loading....</h2>
      ) : (
        <Container>
          <Header> Schedule</Header>
          <Months>
            {games.map((month) => (
              <Month month={month} />
            ))}
          </Months>
        </Container>
      )}
    </>
  );
};
