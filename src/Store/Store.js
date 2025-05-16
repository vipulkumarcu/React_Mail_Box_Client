import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "../Features/AlertSlice";
import userReducer from "../Features/UserSlice";

const Store = configureStore (
  {
    reducer: {
      alert: alertReducer,
      user: userReducer,
    }
  }
);

export default Store;