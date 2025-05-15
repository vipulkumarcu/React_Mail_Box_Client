import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idToken: localStorage.getItem ( "idToken" ) || null,
  refreshToken: localStorage.getItem ( "refreshToken" ) || null,
  expiresIn: localStorage.getItem ( "expiresIn" ) || null,
  displayName: localStorage.getItem ( "displayName" ) || null,
  email: localStorage.getItem ( "email" ) || null,
};

const userSlice = createSlice (
  {
    name: "user",

    initialState,

    reducers: {
      setUser: ( state, action ) => {
        const { idToken, refreshToken, expiresIn, displayName, email } = action.payload;
        state.idToken = idToken;
        state.refreshToken = refreshToken;
        state.expiresIn = expiresIn;
        state.displayName = displayName;
        state.email = email;

        localStorage.setItem ( "idToken", action.payload.idToken );
        localStorage.setItem ( "refreshToken", action.payload.refreshToken );
        localStorage.setItem ( "expiresIn", action.payload.expiresIn );
        localStorage.setItem ( "displayName", action.payload.displayName );
        localStorage.setItem ( "email", action.payload.email );
      },

      clearUser: ( state ) => {
        state.idToken = null;
        state.refreshToken = null;
        state.expiresIn = null;
        state.displayName = null;
        state.email = null;

        localStorage.removeItem ( "idToken" );
        localStorage.removeItem ( "refreshToken" );
        localStorage.removeItem ( "expiresIn" );
        localStorage.removeItem ( "displayName" );
        localStorage.removeItem ( "email" );
      },
    }
  }
);

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;