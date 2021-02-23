import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../hooks';
import { login } from '../redux/reducers/userSlice';
import { LoginSignUpBox, Submit } from './LoginSignUpBoxComponents';

export function Login() {
  const dispatch = useDispatch();

  const userStatus = useSelector((state) => state.user.status);
  const [username, usernameInput] = useInput({
    type: 'text',
    placeholder: 'Username',
  });
  const [password, passwordInput] = useInput({
    type: 'password',
    placeholder: 'Password',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <LoginSignUpBox>
      <h2>Login</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        {usernameInput}
        <br />
        {passwordInput}
        <br />
        <Submit
          type="submit"
          disabled={userStatus === 'loading'}
          value="Login"
        />
      </form>
    </LoginSignUpBox>
  );
}
