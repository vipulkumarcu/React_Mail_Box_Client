import { createSelector, createSlice } from "@reduxjs/toolkit";


/* ---------- initial state ---------- */
const initialState = {

  // { $id, ownerId, folder, subject, body, timestamp, attachments, senderName, senderEmail, receiverName, receiverEmail, isRead }

  inbox: [],
  sent: [],
  trash: [],

  loaded: false,
  folder: "Inbox",
  unReadCount: 0,
  filter: "",
  currentPage: 1,
  perPage: 7,
};


/* ---------- slice ---------- */
const mailSlice = createSlice (
  {
    name: "mail",

    initialState,

    reducers: {
    /* CRUD */
      loadData: ( state, { payload } ) => {
        // Initialize inbox, sent and trash
        state.inbox = payload.inbox || [];
        state.sent  = payload.sent || [];
        state.trash = payload.trash || [];

        // Set loaded to true
        state.loaded = true;

        // Calculate unread count from inbox using reduce
        state.unReadCount = state.inbox.reduce (
          ( count, email ) => ( !email.isRead ? count + 1 : count ), 0
        );
      },

      /* mark email as read */
      mailViewed: ( state, { payload } ) => {
        const { $id, folder } = payload;
        const key = folder.toLowerCase ();

        const mail = state[ key ].find ( ( mail ) => mail.$id === $id );
        if ( mail && !mail.isRead )
        {
          mail.isRead = true;
          // Count never goes below zero
          if ( folder === "Inbox" ) state.unReadCount = Math.max ( 0, state.unReadCount - 1 );
        }
      },

      /* add single email to folder */
      addToInbox: ( state, { payload } ) => {
        state.inbox.unshift ( payload )
      },

      addToSent: ( state, { payload } ) => {
        state.sent.unshift ( payload )
      },

      //* move email to Trash (from Inbox or Sent) */
      addToTrash: ( state, { payload } ) => {
        const { $id, folder: sourceFolder, isRead } = payload;
        const folderKey = sourceFolder.toLowerCase ();

        // 1. Remove from current folder
        state[folderKey] = state[folderKey].filter ( mail => mail.$id !== $id );

        // 2. Update unread count if moving unread mail from Inbox
        if ( sourceFolder === "Inbox" && !isRead )
        {
          state.unReadCount = Math.max ( 0, state.unReadCount - 1 );
        }

        // 3. Create a new object for Trash
        const trashedMail = {
          ...payload,
          originalFolder: sourceFolder, // remember original folder
          folder: "Trash",
        };

        // 4. Add to Trash
        state.trash.unshift ( trashedMail );
      },

      /* restore email from Trash */
      undoFromTrash: ( state, { payload } ) => {
        const { $id, originalFolder, isRead } = payload;
        const folderKey = originalFolder?.toLowerCase ();

        // 1. Remove from Trash
        state.trash = state.trash.filter ( mail => mail.$id !== $id );

        // 2. Restore to original folder if valid
        if ( originalFolder && state[ folderKey ] )
        {
          const restoredMail = {
            ...payload,
            folder: originalFolder,
          };

          // 3. Update unread count if restoring unread mail to Inbox
          if ( originalFolder === "Inbox" && !isRead )
          {
            state.unReadCount++;
          }

          // 4. Clean up metadata and push back to original folder
          delete restoredMail.originalFolder;
          state[folderKey].unshift(restoredMail);
        }
      },

      /* remove permanently */
      removeFromInbox: ( state, { payload } ) =>{
        ( state.inbox = state.inbox.filter ( ( mail ) => mail.$id !== payload ) )
      },

      removeFromSent: ( state, { payload } ) => {
        ( state.sent = state.sent.filter ( ( mail ) => mail.$id !== payload ) )
      },

      removeFromTrash: ( state, { payload } ) => {
        ( state.trash = state.trash.filter ( ( mail ) => mail.$id !== payload ) )
      },

      resetMailState: (state) => {
        state.inbox  = [];
        state.sent   = [];
        state.trash  = [];
        state.loaded = false;
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


/* ---------- actions ---------- */
export const { loadData, mailViewed, addToInbox, addToSent, addToTrash, undoFromTrash, removeFromInbox, removeFromSent, removeFromTrash, resetMailState, setFolder, setFilter, setCurrentPage, } = mailSlice.actions;


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

/* filter by subject / sender / receiver */
export const selectFilteredList = createSelector (
  [ selectFolderList, selectFilter ],
  ( list, filter ) => {

    const term = filter.trim ().toLowerCase ();
    if ( !term ) return list;

    return list.filter (
      ( e ) => {

        const haystack = [
          e.subject,
          e.senderName,
          e.receiverName,
          e.senderEmail,
          e.receiverEmail,
        ];

        return haystack.some (
          ( text ) => text && text.toLowerCase ().includes ( term )
        );
      }
    );
  }
);

export const selectLoaded = ( state ) => state.mail.loaded;

/* single email by id */
export const selectEmailById = createSelector (
  [
    ( state ) => state.mail.inbox,
    ( state ) => state.mail.sent,
    ( state ) => state.mail.trash,
    (_, id )  => id,
  ],
  ( inbox, sent, trash, id ) =>
    [ ...inbox, ...sent, ...trash ].find ( ( e ) => e.$id === id )
);

/* paginated slice + total pages */
export const selectPageSlice = createSelector (
  [ selectFilteredList, selectPage, selectPerPage ],
  ( list, page, perPage ) => {
    const start = ( page - 1 ) * perPage;
    return list.slice ( start, start + perPage );
  }
);

/* total pages */
export const selectTotalPages = createSelector (
  [ selectFilteredList, selectPerPage ],
  ( list, perPage ) => Math.max ( 1, Math.ceil ( list.length / perPage ) )
);

export default mailSlice.reducer;