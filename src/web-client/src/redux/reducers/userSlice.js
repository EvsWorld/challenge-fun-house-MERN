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

export const login = createAsyncThunk(
  'user/login',
  async ({ username, password }) => {
    const response = await api.post('/api/auth/login', {
      username,
      password,
    });
    return response.data;
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async ({}, thunkAPI) => {
    const response = await api.get(`/api/users/own`);
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async ({ favoriteCharacters }, thunkAPI) => {
    const response = await api.put(`/api/users/own`, {
      favoriteCharacters,
    });
    return response.data; // returns user object
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
    logoutSuccess: (state, action) => {
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: {
    [signup.pending]: (state, action) => {
      state.status = 'loading';
    },
    [signup.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
    },
    [signup.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [login.pending]: (state, action) => {
      state.status = 'loading';
    },
    [login.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched characters to the array
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
    },
    [login.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [fetchUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.user = { ...state.user, ...action.payload.user };
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [updateUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [updateUser.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.user = { ...state.user, ...action.payload.user };
    },
    [updateUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

const { logoutSuccess } = userSlice.actions;

export const logout = () => async (dispatch) => {
  try {
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};

export default userSlice.reducer;
