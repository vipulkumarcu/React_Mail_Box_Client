import { useEffect } from "react";
import { useDispatch } from "react-redux";
import database from "../AppwriteServices/Database";
import { loadData } from "../Features/MailSlice";
import { hideLoader, showLoader } from "../Features/LoaderSlice";
import { errorMessages, successMessages } from "../Helpers/HelperAlertMessages";
import { showErrorMessage, showSuccessMessage } from "../Helpers/HelperAlertFunctions";
import { formatEmailData } from "../Helpers/HelperTableFunctions";
import InboxJSON from "../Data/Inbox.json";
import SentJSON  from "../Data/Sent.json";
import TrashJSON from "../Data/Trash.json";
import { Sidebar, Topbar, Content } from "../Components";

function LandingPage ()
{
  /* ──────────────────── HOOK ──────────────────── */
  const dispatch = useDispatch ();

  /* ──────────────────── LOCAL STORAGE ──────────────────── */
  const userId = localStorage.getItem ( "userId" );

  /* ──────────────────── USEEFFECT TO FETCH EMAILS ──────────────────── */
  useEffect (
    () => {
      let cancelled = false; // protects against setState on unmount

      async function fetchEmails ()
      {
        dispatch ( showLoader () );

        try
        {
          /* ---------- 1. FETCH MAIL DATA ---------- */

          const [ inboxResponse, sentResponse, trashResponse ] = await Promise.all (
            [
              database.getInboxEmails ( userId ),
              database.getSentEmails ( userId ),
              database.getTrashEmails ( userId) ,
            ]
          );

          /* ---------- 2. FORMAT DATA (API or JSON) ---------- */

          const inbox = inboxResponse.status
            ? formatEmailData ( inboxResponse.data )
            : formatEmailData ( InboxJSON );

          const sent = sentResponse.status
            ? formatEmailData ( sentResponse.data )
            : formatEmailData ( SentJSON );

          const trash = trashResponse.status
            ? formatEmailData ( trashResponse.data )
            : formatEmailData ( TrashJSON );

          /* ---------- 3. STORE IN REDUX ---------- */

          if ( !cancelled )
          {
            dispatch ( loadData ( { inbox, sent, trash } ) );
          }

          /* ---------- 4. UI FEEDBACK ---------- */

          if ( !inboxResponse.status ) showErrorMessage ( dispatch, inboxResponse.message, 1500 );
          if ( !sentResponse.status ) showErrorMessage ( dispatch, sentResponse.message, 1500 );
          if ( !trashResponse.status ) showErrorMessage ( dispatch, trashResponse.message, 1500 );

          if ( trashResponse.status ) showSuccessMessage ( dispatch, inboxResponse.message, 1500 );
          if ( trashResponse.status ) showSuccessMessage ( dispatch, inboxResponse.message, 1500 );
          if ( trashResponse.status ) showSuccessMessage ( dispatch, inboxResponse.message, 1500 );
        }

        /* ---------- CATCHING ANY ERROR ---------- */

        catch ( error )
        {
          if ( !cancelled )
          {
            showErrorMessage (
              dispatch,
              errorMessages[ error.type?.toUpperCase () ]
                || error.message
                || errorMessages.DEFAULT
            );
          }
        }

        /* ---------- HIDE LOADER ---------- */

        finally
        {
          if ( !cancelled ) dispatch ( hideLoader () );
        }
      }

      fetchEmails ();

      /* ---------- CLEANUP ---------- */

      return () => {
        cancelled = true;
      };

    }, [ dispatch, userId ]
  );

  /* ───────────────────────── JSX ───────────────────────── */
  return (
    <div
      className = "w-screen h-screen grid grid-cols-[220px_1fr] grid-rows-[auto_1fr] bg-gradient-to-br from-blue-100 to-indigo-300"
    >
      <Sidebar />

      <Topbar />

      <Content />
    </div>
  );
}

export default LandingPage;