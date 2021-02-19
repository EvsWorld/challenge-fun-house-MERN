import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import { LoginAndSignUp } from './LoginAndSignUp';
import { UserProfile } from './UserProfile';

export function Authentication() {
  const { user } = useSelector((state) => state.user);
  console.log('Authentication: user :>> ', user);
  return (
    <div>
      <h2>Authentication Component</h2>
      {user ? <UserProfile user={user} /> : <LoginAndSignUp />}
    </div>
  );
}
