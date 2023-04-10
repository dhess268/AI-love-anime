import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import loggedInReducer from './LoggedInSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    loggedIn: loggedInReducer,
  },
});
