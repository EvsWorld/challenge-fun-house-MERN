import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useInput } from '../hooks';
import { login } from '../redux/reducers/userSlice';
import { LoginSignUpBox, Submit } from './LoginSignUpBoxComponents';

export function Login() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
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
  if (user) {
    return <Redirect to="/" />;
  }
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
          disabled={user && user.status === 'loading'}
          value="Login"
        />
      </form>
    </LoginSignUpBox>
  );
}
