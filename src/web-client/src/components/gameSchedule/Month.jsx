import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { FaAngleRight } from 'react-icons/fa';

const MonthHeading = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  overflow: hidden;
`;
const MonthContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  overflow: hidden;
`;

const GameListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1em;
  overflow: hidden;
  border-top: 1.5px solid #e9ecef;
  border-left: 1.5px solid #e9ecef;
  border-right: 1.5px solid #e9ecef;
`;
const Game = styled.div`
  display: flex;
  overflow: hidden;
  border-bottom: 1.5px solid #e9ecef;
  justify-content: space-between;
`;
const GameLeft = styled.div`
  display: flex;
  overflow: hidden;
`;

const CardBody = styled.div`
  padding: 0.5em;
`;

const Opponent = styled.h4`
  color: #4c4c50;
  font-weight: 800;
`;
const Location = styled.h4`
  color: #7f8f9a;
`;
const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 4.4em;
`;

const Day = styled.div`
  color: #7f8f9a;
  font-weight: 600;
`;
const Date = styled.div`
  font-weight: 600;
  font-size: 1.5em;
  line-height: 1em;
`;

const TimeContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-width: 6em;
  overflow: hidden;
  color: #7f8f9a;
  font-weight: 600;
  padding: 1em;
`;
export function Month({ month }) {
  const gameContent =
    month.games.length > 0 ? (
      month.games.map((game) => {
        return (
          <Game key={game.start.datetime}>
            <GameLeft>
              <DateContainer>
                {/* // TODO: day and date function */}
                <Day>
                  {moment(game.start.datetime).format('ddd').toUpperCase()}
                </Day>
                <Date>{moment(game.start.datetime).format('D')}</Date>
              </DateContainer>
              <CardBody>
                {/* // TODO: @ or vs function */}
                <Opponent>vs. {game.opponent_name}</Opponent>
                <Location>at {game.location}</Location>
                {/* <pre> {JSON.stringify(game, null, 2)}</pre> */}
              </CardBody>
            </GameLeft>
            <TimeContainer>
              {moment(game.start.datetime).format('h:mm A')}
              <FaAngleRight />
            </TimeContainer>
          </Game>
        );
      })
    ) : (
      <div> No games this month</div>
    );

  return (
    <MonthContainer>
      <MonthHeading>
        {/* // TODO: month and year function */}
        <h3>
          {month._id.month} {month._id.year}
        </h3>
      </MonthHeading>
      <GameListContainer>{gameContent}</GameListContainer>
    </MonthContainer>
  );
}
