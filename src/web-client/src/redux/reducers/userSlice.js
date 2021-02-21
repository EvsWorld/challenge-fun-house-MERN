import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/axiosConfig';

const initialUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

export const signup = createAsyncThunk(
  'user/signup',
  async ({ username, email, password }) => {
    const response = await api.post('/api/auth/signup', {
      username,
      email,
      password,
    });
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: initialUser,
    status: 'idle',
    error: null,
  },
  reducers: {
    signupSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
    },
    logoutSuccess: (state, action) => {
      state.user = null;
      localStorage.removeItem('user');
      localStorage.remoeItem('token');
    },
  },
  extraReducers: {
    [signup.pending]: (state, action) => {
      state.status = 'loading';
    },
    [signup.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched characters to the array
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
    },
    [signup.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

const { signupSuccess, loginSuccess, logoutSuccess } = userSlice.actions;

// export const signup = ({ username, email, password }) => async (dispatch) => {
//   try {
//     await api.post('/api/auth/signup', {
//       username,
//       email,
//       password,
//     });
//     // console.log('res = ', await res);
//     dispatch(signupSuccess({ username, email }));
//   } catch (e) {
//     return console.error(e.message);
//   }
// };

export const login = ({ username, email, password }) => async (dispatch) => {
  try {
    const res = await api.post('/api/auth/login', { username, password });
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
