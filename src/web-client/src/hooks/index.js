import { useState } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  border: 1px solid #000;
  border-radius: 10px;
  padding: 8px;
  margin: 5px;
  width: 150px;
  box-sizing: border-box;
`;

export function useInput({ type, placeholder }) {
  const [value, setValue] = useState('');
  const input = (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
      placeholder={placeholder}
    />
  );
  return [value, input];
}
