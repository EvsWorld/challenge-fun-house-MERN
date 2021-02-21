import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUser } from '../redux/reducers/userSlice';

import { LoginAndSignUp } from './LoginAndSignUp';
import { UserProfile } from './UserProfile';

export function Authentication() {
  const { user } = useSelector((state) => state.user);
  // useEffect(() => {
  //   if ()
  //   fetchUser(user.id)

  // }, [user]);

  console.log('Authentication: user :>> ', user);
  return (
    <div>
      <h2>Authentication Component</h2>
      {user ? <UserProfile user={user} /> : <LoginAndSignUp />}
    </div>
  );
}
