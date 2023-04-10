import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  status: false,
};

export const loggedInSlice = createSlice({
  name: 'loggedIn',
  initialState,
  reducers: {
    login: (state) => {
      state.status = true;
    },
    logout: (state) => {
      state.status = false;
    },
  },
});
// Action creators are generated for each case reducer function
export const { login, logout } = loggedInSlice.actions;

export default loggedInSlice.reducer;
