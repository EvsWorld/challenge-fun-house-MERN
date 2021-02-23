import React from 'react';
import styled from 'styled-components';

import { Login } from './Login';
import { SignUp } from './SignUp';

const Container = styled.div`
  display: flex;
  width: 35em;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  @media (max-width: 500px) {
    flex-direction: column;
    height: 40em;
  }
`;

export function LoginAndSignUp() {
  return (
    <Container>
      <Login />
      <SignUp />
    </Container>
  );
}
