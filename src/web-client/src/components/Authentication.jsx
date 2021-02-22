import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../redux/reducers/userSlice';

import { LoginAndSignUp } from './LoginAndSignUp';
import { UserProfile } from './UserProfile';

export function Authentication() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // TODO: fetch user here
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div>
      <h2>Authentication Component</h2>
      {user ? <UserProfile user={user} /> : <LoginAndSignUp />}
    </div>
  );
}
