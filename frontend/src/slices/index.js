import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import loggedInReducer from './LoggedInSlice';
import animeReducer from './AnimeSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    loggedIn: loggedInReducer,
    anime: animeReducer,
  },
});
