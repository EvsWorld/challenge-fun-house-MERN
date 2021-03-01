import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WelcomeDialogue = styled.div`
  ${'' /* width: 20em; */}
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
`;

const Field = styled.div`
  margin: 1em;
`;

export function UserProfile() {
  const { user } = useSelector((state) => state.user);

  return (
    <Container>
      <WelcomeDialogue>
        <Field>username: {user.username}</Field>
        <Field>email: {user.email}</Field>
      </WelcomeDialogue>
    </Container>
  );
}
