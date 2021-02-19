import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { useInput } from '../hooks';
import { login, logout } from '../redux/reducers/userSlice';

export function Login() {
  const dispatch = useDispatch();

  const [username, usernameInput] = useInput({ type: 'text' });
  const [password, passwordInput] = useInput({ type: 'password' });
  const [email, emailInput] = useInput({ type: 'email' });

  return (
    <div>
      <form onSubmit={() => dispatch(login({ username, email, password }))}>
        {usernameInput}
        <br />
        {emailInput}
        <br />
        {passwordInput}
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
