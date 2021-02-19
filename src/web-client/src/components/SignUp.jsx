import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { useInput } from '../hooks';
import { login, logout, signup } from '../redux/reducers/userSlice';

export function SignUp() {
  const dispatch = useDispatch();

  const [username, usernameInput] = useInput({ type: 'text' });
  const [password, passwordInput] = useInput({ type: 'password' });
  const [email, emailInput] = useInput({ type: 'email' });

  return (
    <div>
      <form onSubmit={() => dispatch(signup({ username, email, password }))}>
        {usernameInput}
        <br />
        {emailInput}
        <br />
        {passwordInput}
        <br />
        <input type="submit" value="Signup" />
      </form>
    </div>
  );
}
