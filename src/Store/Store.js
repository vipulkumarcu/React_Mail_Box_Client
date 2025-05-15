import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "../Features/Slices/AlertSlice";
import userReducer from "../Features/Slices/UserSlice";

const Store = configureStore (
  {
    reducer: {
      alert: alertReducer,
      user: userReducer,
    }
  }
);

export default Store;