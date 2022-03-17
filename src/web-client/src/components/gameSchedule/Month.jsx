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
  width: 700px;
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
  justify-content: space-around;
  align-items: center;
  min-width: 6em;
  overflow: hidden;
  color: #7f8f9a;
  font-weight: 600;
  padding: 0.6em;
`;

const getMonthName = (monthIndex) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[monthIndex - 1];
};

// TODO: order the games in the aggregation script
export function Month({ month }) {
  const atOrVs = (gm) => {
    return gm.home_away === 'home' ? 'vs' : '@';
  };
  function compare(a, b) {
    if (a.start.datetime < b.start.datetime) {
      return -1;
    }
    if (a.start.datetime > b.start.datetime) {
      return 1;
    }
    return 0;
  }

  const gameContent =
    month.games.length > 0 ? (
      month.games.sort(compare).map((game) => {
        return (
          <Game key={game.start.datetime}>
            <GameLeft>
              <DateContainer>
                <Day>
                  {moment(game.start.datetime).format('ddd').toUpperCase()}
                </Day>
                <Date>{moment(game.start.datetime).format('D')}</Date>
              </DateContainer>
              <CardBody>
                <Opponent>
                  {atOrVs(game)} {game.opponent_name}
                </Opponent>
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
        <h3>
          {getMonthName(month._id.month)} {month._id.year}
        </h3>
      </MonthHeading>
      <GameListContainer>{gameContent}</GameListContainer>
    </MonthContainer>
  );
}
