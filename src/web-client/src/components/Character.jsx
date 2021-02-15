import React, { useContext } from 'react';

export function Character({ id, name }) {
  return (
    <article className="Character">
      <p>Name: {name}</p>
    </article>
  );
}
