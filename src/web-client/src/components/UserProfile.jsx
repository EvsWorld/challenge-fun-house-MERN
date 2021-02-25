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

const NiceButton = styled.button`
  background: rgb(139, 0, 0);
  color: #fff;
  padding: 8px;
  margin: 5px;
  width: 100px;
  border: none;
  border-radius: 10px;
  box-sizing: border-box;
`;

export function UserProfile() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  return (
    <Container>
      <WelcomeDialogue>
        <div> Welcome, {user.username} </div>
        <NiceButton onClick={() => dispatch(logout())}>Logout</NiceButton>
      </WelcomeDialogue>
      {/* <Characters /> */}
    </Container>
  );
}
