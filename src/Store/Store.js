import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "../Features/Slices/AlertSlice";

const Store = configureStore (
  {
    reducer: {
      alert: alertReducer,
    }
  }
);

export default Store;