import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Character } from './Character';
import api from '../utils/axiosConfig';
import * as actions from '../redux/actions/actionTypes';
import {
  fetchCharacters,
  selectAllCharacters,
} from '../redux/reducers/charactersSlice';
import { updateUser } from '../redux/reducers/userSlice';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export function Characters({ user }) {
  const dispatch = useDispatch();
  const characters = useSelector(selectAllCharacters);
  const characterStatus = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);
  // TODO: a way to favorite characters
  // update user > characters
  // const user = useSelector((state) => state.user.user);
  const favoriteCharactersFromRedux = user.favoriteCharacters;
  console.log('favoriteCharactersFromRedux :>> ', favoriteCharactersFromRedux);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);

  // Initially get favorite characters from redux
  useEffect(() => {
    setFavoriteCharacters(favoriteCharactersFromRedux);
  }, []);

  // When favoriteCharacters is updated, send to update backend
  useEffect(() => {
    dispatch(
      updateUser({
        favoriteCharacters,
      })
    );
  }, [favoriteCharacters, dispatch]);

  // funciton for Character component to know if should render heart
  const isFavorite = (characterId) => {
    // console.log('isFavorite called with ', characterId);
    const result = favoriteCharacters.includes(characterId);
    // console.log('isFavorite: ', result);
    return result;
  };

  const handleToggleFavorite = (characterId) => {
    console.log('handleToggleFavorite called with ', characterId, '\n');
    const addOrRemoveCharacterToFavorites = (charId) => {
      var newFavoriteCharacters = [...favoriteCharacters];
      console.log('newFavoriteCharacters :>> ', newFavoriteCharacters);
      var indexItem = newFavoriteCharacters.indexOf(charId);
      console.log('indexItem :>> ', indexItem);
      if (indexItem === -1) {
        newFavoriteCharacters.push(charId);
      } else {
        newFavoriteCharacters.splice(indexItem, 1);
      }

      setFavoriteCharacters(newFavoriteCharacters);
    };
    addOrRemoveCharacterToFavorites(characterId);
  };

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
      <Character
        isFavorite={() => isFavorite(character._id)}
        onToggleFavorite={() => handleToggleFavorite(character._id)}
        {...character}
        key={character._id.toString()}
      />
    ));
  } else if (characterStatus === 'failed') {
    content = <div>{error}</div>;
  }
  return <Container>{content}</Container>;
}
