import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inbox: [],
  sent: [],
  drafts: [],
  spam: [],
  starred: [],
  archive: [],
}

const mailSlice = createSlice (
  {
    name: "mail",

    initialState,

    reducers: {
      //Adding mail to appropriate folder
      addToInbox: ( state, action ) => state.inbox.push ( action.payload ),
      addToSent: ( state, action ) => state.sent.push ( action.payload ),
      addToDrafts: ( state, action ) => state.drafts.push ( action.payload ),
      addToSpam: ( state, action ) => state.spam.push ( action.payload ),
      addToStarred: ( state, action ) => state.starred.push ( action.payload ),
      addToArchive: ( state, action ) => state.archive.push ( action.payload ),

      //Removing mail from appropriate folder
      removeFromInbox: ( state, action ) => state.inbox = state.inbox.filter ( mail => mail.id !== action.payload.id ),
      removeFromSent: ( state, action ) => state.sent = state.sent.filter ( mail => mail.id !== action.payload.id ),
      removeFromDrafts: ( state, action ) => state.drafts = state.drafts.filter ( mail => mail.id !== action.payload.id ),
      removeFromSpam: ( state, action ) => state.spam = state.spam.filter ( mail => mail.id !== action.payload.id ),
      removeFromStarred: ( state, action ) => state.starred = state.starred.filter ( mail => mail.id !== action.payload.id ),
      removeFromArchive: ( state, action ) => state.archive = state.archive.filter ( mail => mail.id !== action.payload.id ),
    },
  }
);

export const { addToInbox, addToSent, addToDrafts, addToSpam, addToStarred, addToArchive, removeFromInbox, removeFromSent, removeFromDrafts, removeFromSpam, removeFromStarred, removeFromArchive } = mailSlice.actions;

export default mailSlice;