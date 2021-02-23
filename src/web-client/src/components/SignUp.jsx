import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../hooks';
import { signup } from '../redux/reducers/userSlice';
import { LoginSignUpBox, Submit } from './LoginSignUpBoxComponents';

export function SignUp() {
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
  const [email, emailInput] = useInput({
    type: 'email',
    placeholder: 'Email',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ username, email, password }));
  };

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
          disabled={userStatus === 'loading'}
          value="Signup"
          id="submit"
        />
      </form>
    </LoginSignUpBox>
  );
}
