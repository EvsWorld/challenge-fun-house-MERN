import axios from 'axios';
import React, { useContext } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Character } from './Character.jsx';
import client from '../utils/axiosConfig';

export function Characters() {
  const { isLoading, error, data, isFetching } = useQuery('characters', () =>
    client.get(`api/characters`).then((res) => res.data)
  );

  const favoriteACharacter = useMutation((newCharacter) =>
    client.post(`/api/characters`, newCharacter)
  );

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <section className="Characters">
      {data.map((character) => (
        <Character {...character} key={character.id} />
      ))}

      <div>{isFetching ? 'Updating...' : ''}</div>
    </section>
  );
}
