import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  inbox: [],
  sent: [],
  trash: [],

  folder: "Inbox",
  filter: "",
  currentPage: 1,
  perPage: 7,
};


const mailSlice = createSlice (
  {
    name: "mail",

    initialState,

    reducers: {
    /* CRUD */
      loadData: ( state, { payload } ) => {
        state.inbox = payload.inbox;
        state.sent  = payload.sent;
        state.trash = payload.trash;
      },

      addToInbox: ( state, { payload } ) => {
        state.inbox.push ( payload )
      },
      addToSent: ( state, { payload } ) => {
        state.sent.push ( payload )
      },
      addToTrash: ( state, { payload } ) => {
        state.trash.push ( payload )
        state[ payload.folder.toLowerCase () ] = state[ payload.folder.toLowerCase () ].filter (
          ( mail ) => mail.id !== payload.id )
      },

      removeFromInbox: ( state, { payload } ) =>{
        ( state.inbox = state.inbox.filter ( ( mail ) => mail.id !== payload ) )
      },

      removeFromSent: ( state, { payload } ) => {
        ( state.sent = state.sent.filter ( ( mail ) => mail.id !== payload ) )
      },

      removeFromTrash: ( state, { payload } ) => {
        ( state.trash = state.trash.filter ( ( mail ) => mail.id !== payload.id ) )
      },

      /* UI state */
      setFolder: ( state, { payload } ) => {
        state.folder = payload;
        state.currentPage = 1;               // reset page on folder switch
      },
      setFilter: ( state, { payload } ) => {
        state.filter = payload;
        state.currentPage = 1;               // reset page on search
      },
      setCurrentPage: ( state, { payload } ) => {
        state.currentPage = payload;
      },
    },
  }
);

export const { loadData, addToInbox, addToSent, addToTrash, removeFromInbox, removeFromSent, removeFromTrash, setFolder, setFilter, setCurrentPage, } = mailSlice.actions;

/* ---------- selectors ---------- */
const selectMailState = ( state ) => state.mail;
export const selectFolder = ( state ) => state.mail.folder;
export const selectFilter = ( state ) => state.mail.filter;
export const selectPage = ( state ) => state.mail.currentPage;
export const selectPerPage = ( state ) => state.mail.perPage;

/* raw list for active folder */
export const selectFolderList = createSelector (
  [ selectMailState, selectFolder ],
  ( mail, folder ) => mail[ folder.toLowerCase () ] || []
);

/* filter by subject OR sender */
export const selectFilteredList = createSelector (
  [ selectFolderList, selectFilter ],
  ( list, filter ) => {

    const term = filter.trim ().toLowerCase ();
    if ( !term ) return list;

    return list.filter (
      ( e ) => {

        const haystack = [
          e.subject,
          e.from,
          e.to,
          e.emailId,
        ];

        return haystack.some (
          ( text ) => text && text.toLowerCase ().includes ( term )
        );
      }
    );
  }
);

/* paginated slice + total pages */
export const selectPageSlice = createSelector (
  [ selectFilteredList, selectPage, selectPerPage ],
  ( list, page, perPage ) => {
    const start = ( page - 1 ) * perPage;
    return list.slice ( start, start + perPage );
  }
);

export const selectTotalPages = createSelector (
  [ selectFilteredList, selectPerPage ],
  ( list, perPage ) => Math.max ( 1, Math.ceil ( list.length / perPage ) )
);

export default mailSlice.reducer;