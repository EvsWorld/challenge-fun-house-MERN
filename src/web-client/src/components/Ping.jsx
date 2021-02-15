import React from 'react';
import { useQuery } from 'react-query';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export function Ping() {
  const { isLoading, error, data, isFetching } = useQuery('ping', () =>
    fetch(`${API_URL}/ping`).then((res) => res.json())
  );

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      {/* <p>app name: {data.appName}</p> */}
      {/* <p>version: {data.version}</p> */}
      {/* <p>status: {data.status}</p> */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <div>{isFetching ? 'Updating...' : ''}</div>
    </div>
  );
}
