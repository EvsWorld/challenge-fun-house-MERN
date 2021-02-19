import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useInput } from '../hooks';
import api from '../utils/axiosConfig';

export function NewCharacter() {
  const [characterName, characterNameInput] = useInput({ type: 'text' });
  const handleUpdateCharacter = async (characterName) => {
    await api.post(`api/characters`, characterName);
  };

  return (
    <>
      {characterNameInput}
      <button onClick={() => handleUpdateCharacter(characterName)}>
        Create character
      </button>
    </>
  );
}
