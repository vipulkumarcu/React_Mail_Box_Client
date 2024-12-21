import { configureStore } from '@reduxjs/toolkit';
import alertReducer from '../Features/Slices/alertSlice';

const store = configureStore (
  {
    reducer: {
      alert: alertReducer,
    },
  }
);

export default store;