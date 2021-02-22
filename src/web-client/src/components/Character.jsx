import React from 'react';
import { selectCharacterById } from '../redux/reducers/charactersSlice';
import api from '../utils/axiosConfig';

export function Character({ id, name, gender, image, species, status, url }) {
  // const character = useSelector((state) =>
  //   selectCharacterById(state, characterId)
  // );

  return (
    <article className="Character">
      <h5> Character:</h5>
      <p>Name: {name}</p>
      <p>gender: {gender}</p>
      <p>species: {species}</p>
      <p>status: {status}</p>
    </article>
  );
}
