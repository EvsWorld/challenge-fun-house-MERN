import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';

const Nav = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
  background-color: #fff;
  width: 100%;
`;

const NavHeader = styled.div`
  max-width: 1200px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: space-between;
`;

const Title = styled.h1`
  padding-left: 0.2em;
`;

const Navbar = () => {
  return (
    <Nav>
      <NavHeader>
        <Title className="logo">MERN Funhouse</Title>
        <Burger />
      </NavHeader>
    </Nav>
  );
};

export default Navbar;
