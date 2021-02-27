import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { logout } from '../redux/reducers/userSlice';
import { Characters } from './Characters';

const Container = styled.div`
  display: flex;
  // margin: 1em;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WelcomeDialogue = styled.div`
  border: 1px solid #000;
  width: 20em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Titilillium Web';
`;

export function UserProfile() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  console.log('UserProfile: user :>> ', user);

  return (
    <Container>
      <WelcomeDialogue>
        <div> Welcome, {user.username} </div>
      </WelcomeDialogue>
    </Container>
  );
}
