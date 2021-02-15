import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Character } from './Character';
import client from '../utils/axiosConfig';
import * as actions from '../redux/actions/actionTypes';
import {
  fetchCharacters,
  selectAllCharacters,
} from '../redux/reducers/charactersSlice';

export function Characters() {
  const dispatch = useDispatch();
  const characters = useSelector(selectAllCharacters);
  const characterStatus = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);

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
      <Character {...character} key={character.id} />
    ));
  } else if (characterStatus === 'failed') {
    content = <div>{error}</div>;
  }
  return <section className="Characters">{content}</section>;
}
