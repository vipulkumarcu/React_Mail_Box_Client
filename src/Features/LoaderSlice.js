import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice (
  {
    name: "loader",

    initialState: {
      show: false
    },

    reducers: {
      showLoader: ( state ) => {
        state.show = true;
      },
      hideLoader: ( state ) => {
        state.show = false;
      },
    },
  }
);

export const { showLoader, hideLoader } = loaderSlice.actions;

export default loaderSlice.reducer;