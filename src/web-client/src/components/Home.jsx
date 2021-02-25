import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchUser } from '../redux/reducers/userSlice';

import { LoginAndSignUp } from './LoginAndSignUp';
import { UserProfile } from './UserProfile';

export function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  // if (user) {
  //   return <UserProfile />
  // } else {
  //   <Redirect to='/login-and-signup'/>
  // }
  // return <>{user ? <UserProfile user={user} /> : <LoginAndSignUp />}</>;
  return (
    <>
      {' '}
      <div> Home page </div>{' '}
    </>
  );
}
