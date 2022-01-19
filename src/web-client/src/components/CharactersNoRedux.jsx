import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ClipLoader from 'react-spinners/ClipLoader';

import { CenterSmallLayout } from '../components/Layouts';
import { Character } from './Character';
import {
  fetchCharacters,
  selectAllCharacters,
} from '../redux/reducers/charactersSlice';
import { updateUser } from '../redux/reducers/userSlice';

const CharactersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  transition: 1s all ease-in;
  max-width: 1200px;
`;

export function CharactersNoRedux() {
  const dispatch = useDispatch();
  const characters = useSelector(selectAllCharacters);
  const characterStatus = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);
  const user = useSelector((state) => state.user.user);
  const favoriteCharactersFromRedux = user.favoriteCharacters;

  useEffect(() => {
    if (characterStatus === 'idle') {
      dispatch(fetchCharacters());
    }
  }, [characterStatus, dispatch]);

  const handleToggleFavorite = (characterId) => {
    var newFavoriteCharacters = [...favoriteCharactersFromRedux];
    var indexItem = newFavoriteCharacters.indexOf(characterId);
    if (indexItem === -1) {
      newFavoriteCharacters.push(characterId);
    } else {
      newFavoriteCharacters.splice(indexItem, 1);
    }

    dispatch(
      updateUser({
        user: { ...user, favoriteCharacters: newFavoriteCharacters },
      })
    );
  };

  // funciton for Character component to know if should render heart
  const isFavorite = (characterId) => {
    const result = favoriteCharactersFromRedux.includes(characterId);
    return result;
  };

  let content;

  if (characterStatus === 'loading') {
    content = (
      <CenterSmallLayout>
        <ClipLoader size={150} color={'#123abc'} loading={true} />
      </CenterSmallLayout>
    );
  } else if (characterStatus === 'succeeded') {
    content = characters.map((character) => (
      <Character
        isFavorite={() => isFavorite(character._id)}
        onToggleFavorite={() => handleToggleFavorite(character._id)}
        {...character}
        key={character._id}
      />
    ));
  } else if (characterStatus === 'failed') {
    content = <div>{error}</div>;
  }
  return <CharactersContainer>{content}</CharactersContainer>;
}
