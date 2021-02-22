import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Character } from './Character';
import api from '../utils/axiosConfig';
import * as actions from '../redux/actions/actionTypes';
import {
  fetchCharacters,
  selectAllCharacters,
} from '../redux/reducers/charactersSlice';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export function Characters() {
  const dispatch = useDispatch();
  const characters = useSelector(selectAllCharacters);
  const characterStatus = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);
  // TODO: a way to favorite characters
  // update user > characters

  useEffect(() => {
    if (characterStatus === 'idle') {
      dispatch(fetchCharacters());
    }
  }, [characterStatus, dispatch]);

  let content;

  if (characterStatus === 'loading') {
    content = <div className="loader">Loading...</div>;
  } else if (characterStatus === 'succeeded') {
    content = characters.map((character) => (
      <Character {...character} key={character._id.toString()} />
    ));
  } else if (characterStatus === 'failed') {
    content = <div>{error}</div>;
  }
  return <Container>{content}</Container>;
}
