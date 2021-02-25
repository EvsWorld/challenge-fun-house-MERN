import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Character } from './Character';
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

export function Characters() {
  const dispatch = useDispatch();
  const characters = useSelector(selectAllCharacters);
  const characterStatus = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);
  const user = useSelector((state) => state.user.user);
  const favoriteCharactersFromRedux = user.favoriteCharacters;
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
    const result = favoriteCharacters.includes(characterId);
    return result;
  };

  const handleToggleFavorite = (characterId) => {
    const addOrRemoveCharacterToFavorites = (charId) => {
      var newFavoriteCharacters = [...favoriteCharacters];
      var indexItem = newFavoriteCharacters.indexOf(charId);
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
