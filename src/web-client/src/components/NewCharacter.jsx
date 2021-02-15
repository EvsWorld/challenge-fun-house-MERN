import React, { useState } from 'react';
import { useMutation } from 'react-query';
import client from '../utils/axiosConfig';

function useInput({ type /*...*/ }) {
  const [value, setValue] = useState('');
  const input = (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
    />
  );
  return [value, input];
}

export function NewCharacter() {
  const [username, userInput] = useInput({ type: 'text' });
  const handleUpdateCharacter = async (username) => {
    await client.post(`api/characters`, username);
  };

  return (
    <>
      {userInput}
      <button onClick={() => handleUpdateCharacter(username)}>
        Create character
      </button>
    </>
  );
}
