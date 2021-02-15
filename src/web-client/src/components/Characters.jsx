import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { Character } from './Character.jsx';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export function Characters() {
  const { isLoading, error, data, isFetching } = useQuery('characters', () =>
    fetch(`${API_URL}/api/characters`).then((res) => res.json())
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
