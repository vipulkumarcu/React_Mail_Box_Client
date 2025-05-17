import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inbox: [],
  sent: [],
  trash: [],
}

const mailSlice = createSlice (
  {
    name: "mail",

    initialState,

    reducers: {
      //Adding mail to appropriate folder
      addToInbox: ( state, action ) => state.inbox.push ( action.payload ),
      addToSent: ( state, action ) => state.sent.push ( action.payload ),
      addToTrash: ( state, action ) => state.trash.push ( action.payload ),

      //Removing mail from appropriate folder
      removeFromInbox: ( state, action ) => state.inbox = state.inbox.filter ( mail => mail.id !== action.payload.id ),
      removeFromSent: ( state, action ) => state.sent = state.sent.filter ( mail => mail.id !== action.payload.id ),
      removeFromTrash: ( state, action ) => state.trash = state.trash.filter ( mail => mail.id !== action.payload.id ),
    },
  }
);

export const { addToInbox, addToSent, removeFromInbox, removeFromSent } = mailSlice.actions;

export default mailSlice;