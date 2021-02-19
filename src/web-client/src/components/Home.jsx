import React from 'react';
import { Authentication } from './Authentication';
import { Characters } from './Characters';

export function Home() {
  return (
    <>
      <h1>Welcome to Funhouse Home!</h1>
      <Authentication />
      <Characters />
    </>
  );
}
