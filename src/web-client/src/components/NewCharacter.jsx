import React from 'react';
import { useMutation } from 'react-query';
import client from '../utils/axiosConfig';

export function NewCharacter() {
  const mutation = useMutation((newCharacter) =>
    client.post(`api/characters`, newCharacter)
  );

  return (
    <div>
      {mutation.isLoading ? (
        'Adding character...'
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>character added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ name: `A Character ${new Date()}` });
            }}
          >
            Create character
          </button>
        </>
      )}
    </div>
  );
}
