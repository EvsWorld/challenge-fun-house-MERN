import React from 'react';
import styled from 'styled-components';

export const LayoutOne = ({ children }) => (
  <div>
    {/* <h2>Layout One</h2> */}
    {children}
  </div>
);

export const CenterSmallContainer = styled.div`
  margin-top: 5em;
`;

export const CenterSmallLayout = ({ children }) => (
  <CenterSmallContainer>
    {/* <h2>Layout Two</h2> */}

    {children}
  </CenterSmallContainer>
);
