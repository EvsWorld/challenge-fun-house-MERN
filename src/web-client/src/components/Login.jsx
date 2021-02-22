import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../hooks';
import { login } from '../redux/reducers/userSlice';

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
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        {usernameInput}
        <br />
        {passwordInput}
        <br />
        <input
          type="submit"
          disabled={userStatus === 'loading'}
          value="Login"
        />
      </form>
    </div>
  );
}
