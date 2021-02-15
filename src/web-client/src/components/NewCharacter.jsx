import React from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export function NewCharacter() {
  const mutation = useMutation((newCharacter) =>
    axios.post(`${API_URL}/api/characters`, newCharacter)
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
