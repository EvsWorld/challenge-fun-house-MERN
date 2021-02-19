import { createSlice } from '@reduxjs/toolkit';

const initialUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: initialUser,
  },
  reducers: {
    signupSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logoutSuccess: (state, action) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

const { signupSuccess, loginSuccess, logoutSuccess } = userSlice.actions;

export const signup = ({ username, email, password }) => async (dispatch) => {
  try {
    // const res = await api.post('/api/auth/signup/', { username, email, password })
    dispatch(signupSuccess({ username, email }));
  } catch (e) {
    return console.error(e.message);
  }
};

export const login = ({ username, email, password }) => async (dispatch) => {
  try {
    // const res = await api.post('/api/auth/login/', { username, password })
    dispatch(loginSuccess({ username, email }));
  } catch (e) {
    return console.error(e.message);
  }
};

export const logout = () => async (dispatch) => {
  try {
    // const res = await api.post('/api/auth/logout/')
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};

export default userSlice.reducer;
