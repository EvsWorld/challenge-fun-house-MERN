import { useDispatch, useSelector } from 'react-redux';

import { useInput } from '../hooks';
import { signup } from '../redux/reducers/userSlice';

export function SignUp() {
  const dispatch = useDispatch();

  const userStatus = useSelector((state) => state.user.status);
  const [username, usernameInput] = useInput({ type: 'text' });
  const [password, passwordInput] = useInput({ type: 'password' });
  const [email, emailInput] = useInput({ type: 'email' });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userStatus === 'idle') dispatch(signup({ username, email, password }));
  };

  return (
    <div>
      {/* <form onSubmit={() => dispatch(signup({ username, email, password }))}> */}
      <form onSubmit={(e) => handleSubmit(e)}>
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
