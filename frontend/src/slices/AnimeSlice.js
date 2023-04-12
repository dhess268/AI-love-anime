import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  myanimelist: [],
  selected: [],
};

export const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    updateMyanimelist: (state, action) => {
      state.myanimelist = action.payload;
    },
    addSelected: (state, action) => {
      if (state.selected.length < 10) {
        state.selected = [...state.selected, action.payload];
      } else {
        alert('Currently we only support recommendations for up to 10 anime');
      }
    },
    removeSelected: (state, action) => {
      state.selected = _.remove(
        state.selected,
        (anime) => anime.title !== action.payload.title
      );
    },
  },
});
// Action creators are generated for each case reducer function
export const { updateMyanimelist, addSelected, removeSelected } =
  animeSlice.actions;

export default animeSlice.reducer;
