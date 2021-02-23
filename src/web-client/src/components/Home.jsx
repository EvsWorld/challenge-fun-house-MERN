import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../redux/reducers/userSlice';

import { LoginAndSignUp } from './LoginAndSignUp';
import { UserProfile } from './UserProfile';

export function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return <>{user ? <UserProfile user={user} /> : <LoginAndSignUp />}</>;
}
