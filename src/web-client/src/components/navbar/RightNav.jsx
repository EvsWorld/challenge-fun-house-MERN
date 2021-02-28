import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../../redux/reducers/userSlice';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 20px 10px;
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0d2538;
    position: fixed;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3rem;
    transition: transform 0.3s ease-in-out;
    li a {
      color: white;
    }
  }
`;

const StyledLink = styled(Link)`
  color: red;
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const RightNav = ({ open }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { characters } = useSelector((state) => state.characters);
  const renderLogoutOrSignupLogin = () => {
    return user ? (
      <li>
        <StyledLink to="/" onClick={() => dispatch(logout())}>
          Logout
        </StyledLink>
      </li>
    ) : (
      <>
        <li>
          <StyledLink to="/signup">Signup</StyledLink>
        </li>
        <li>
          <StyledLink to="/login">Login</StyledLink>
        </li>
      </>
    );
  };
  return (
    <Ul open={open}>
      <li>
        <StyledLink to="/">Home</StyledLink>
      </li>
      {user ? (
        <li>
          <StyledLink to="/profile">Profile</StyledLink>
        </li>
      ) : null}
      {characters && user ? (
        <li>
          <StyledLink to="/characters">Characters</StyledLink>
        </li>
      ) : null}
      {renderLogoutOrSignupLogin()}
    </Ul>
  );
};

export default RightNav;
