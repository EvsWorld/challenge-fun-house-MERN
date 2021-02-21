import React from 'react';
import { selectCharacterById } from '../redux/reducers/charactersSlice';
import api from '../utils/axiosConfig';

export function Character({ id, name, trait }) {
  // const character = useSelector((state) =>
  //   selectCharacterById(state, characterId)
  // );

  return (
    <article className="Character">
      <h5> Character:</h5>
      <p>Name: {name}</p>
      <p>Trait: {trait}</p>
    </article>
  );
}
