import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "../Features/AlertSlice";
import userReducer from "../Features/UserSlice";
import mailReducer from "../Features/MailSlice";
import loaderReducer from "../Features/LoaderSlice";

const Store = configureStore (
  {
    reducer: {
      alert: alertReducer,
      user: userReducer,
      mail: mailReducer,
      loader: loaderReducer,
    }
  }
);

export default Store;