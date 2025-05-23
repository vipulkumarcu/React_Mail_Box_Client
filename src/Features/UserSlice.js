import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: localStorage.getItem ( "userId" ) || null,
  userName: localStorage.getItem ( "userName" ) || null,
  userEmail: localStorage.getItem ( "userEmail" ) || null,
  sessionId: localStorage.getItem ( "sessionId" ) || null,
  expiresIn: localStorage.getItem ( "expiresIn" ) || null,
};

const userSlice = createSlice (
  {
    name: "user",

    initialState,

    reducers: {
      setUser: ( state, action ) => {

        //-------------- Destructure payload ---------------
        const { userId, userName, userEmail, sessionId, expiresIn } = action.payload;

        //-------------- Update state ---------------
        state.userId = userId;
        state.userName = userName;
        state.userEmail = userEmail;
        state.sessionId = sessionId;
        state.expiresIn = expiresIn;

        //-------------- Update localStorage ---------------
        localStorage.setItem ( "userId", userId );
        localStorage.setItem ( "userName", userName );
        localStorage.setItem ( "userEmail", userEmail );
        localStorage.setItem ( "sessionId", sessionId );
        localStorage.setItem ( "expiresIn", expiresIn );
      },

      clearUser: ( state ) => {

        //-------------- Update state ---------------
        state.userId = null;
        state.userName = null;
        state.userEmail = null;
        state.sessionId = null;
        state.expiresIn = null;

        //-------------- Update localStorage ---------------
        localStorage.clear ();
      },

      refreshSession: ( state, action ) => {

        //-------------- Destructure payload ---------------
        const { expiresIn } = action.payload;

        //-------------- Update state ---------------
        state.expiresIn = expiresIn;

        //-------------- Update localStorage ---------------
        localStorage.setItem ( "expiresIn", action.payload.expiresIn );
      },
    }
  }
);

export const { setUser, clearUser, refreshSession } = userSlice.actions;

export default userSlice.reducer;