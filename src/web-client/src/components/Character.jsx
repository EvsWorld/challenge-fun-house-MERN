import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectCharacterById } from '../redux/reducers/charactersSlice';
import client from '../utils/axiosConfig';

export function Character({ id, name, trait }) {
  // const character = useSelector((state) =>
  //   selectCharacterById(state, characterId)
  // );

  return (
    <article className="Character">
      <p>Name: {name}</p>
      <p>Trait: {trait}</p>
    </article>
  );
}
