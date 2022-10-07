import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import beatReducer from '../features/beat/beatSlice';

export const store = configureStore({
  reducer: {
    beat: beatReducer,
  },
});
