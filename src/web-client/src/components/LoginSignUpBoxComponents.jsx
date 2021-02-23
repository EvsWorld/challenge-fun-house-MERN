import styled from 'styled-components';

export const LoginSignUpBox = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
  width: 200px;
  height: 200px;
  // margin: 10em auto;
  padding: 0.3em;
  border: 2px solid #000;
  border-radius: 20px;
  background: #eee;
  h2 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
  }
`;

export const Submit = styled.input`
  background: green;
  color: #fff;
  padding: 8px;
  margin: 5px;
  width: 100px;
  border: none;
  border-radius: 10px;
  box-sizing: border-box;
`;
