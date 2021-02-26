import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useInput } from '../hooks';
import { signup } from '../redux/reducers/userSlice';
import { LoginSignUpBox, Submit } from './LoginSignUpBoxComponents';

export function SignUp() {
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
  const [email, emailInput] = useInput({
    type: 'email',
    placeholder: 'Email',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ username, email, password }));
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <LoginSignUpBox>
      <h2>Sign Up</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        {usernameInput}
        <br />
        {emailInput}
        <br />
        {passwordInput}
        <br />
        <Submit
          type="submit"
          disabled={user && user.status === 'loading'}
          value="Signup"
          id="submit"
        />
      </form>
    </LoginSignUpBox>
  );
}
