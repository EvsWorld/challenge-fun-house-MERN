import React from 'react';

const LayoutOne = ({ children }) => (
  <div>
    <h2>Layout One</h2>
    {children}
  </div>
);

const LayoutTwo = ({ children }) => (
  <div>
    <h2>Layout Two</h2>
    {children}
  </div>
);

export { LayoutOne, LayoutTwo };
