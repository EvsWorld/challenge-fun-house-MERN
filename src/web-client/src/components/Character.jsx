import React, { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import client from '../utils/axiosConfig';

export function Character({ id, name, isFavorite }) {
  return (
    <article className="Character">
      <p>Name: {name}</p>
    </article>
  );
}
