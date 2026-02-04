import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import memberSlice from './memberSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    member: memberSlice,
  },
});

