import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  email: '',
  anime: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // state.email = action.payload.email;
      // state.anime = action.payload.anime;
      const updatedUser = {
        email: action.payload.user.email || '',
        anime: action.payload.user.anime || [],
      };

      return updatedUser;
    },
    removeUser: () => initialState,
    updateAnime: (state, action) => {
      state.anime = action.payload;
    },
    addAnime: (state, action) => {
      state.anime.push(action.payload);
    },
    removeAnime: (state, action) => {
      state.anime = _.remove(
        state.anime,
        (anime) => (anime.title = action.payload)
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, removeUser, updateAnime, addAnime, removeAnime } =
  userSlice.actions;

export default userSlice.reducer;
