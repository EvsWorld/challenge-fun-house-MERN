import { createAsyncThunk, nanoid, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/axiosConfig';

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async () => {
    const response = await api.get('/api/characters');
    return response.data;
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    characters: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchCharacters.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchCharacters.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched characters to the array
      state.characters = state.characters.concat(action.payload);
    },
    [fetchCharacters.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const selectCharacterById = (state, characterId) =>
  state.characters.find((character) => character.id === characterId);

export const selectAllCharacters = (state) => state.characters.characters;

export default charactersSlice.reducer;
