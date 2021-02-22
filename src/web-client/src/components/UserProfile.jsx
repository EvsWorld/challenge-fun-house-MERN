import React, { Component } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/userSlice';
import { Characters } from './Characters';

export function UserProfile({ user }) {
  const dispatch = useDispatch();

  return (
    <>
      <div> Youre logged in, {user.username} </div>
      <button onClick={() => dispatch(logout())}>Logout</button>
      <Characters />
    </>
  );
}
