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
`;

export function LoginAndSignUp() {
  return (
    <Container>
      <Login />
      <SignUp />
    </Container>
  );
}
