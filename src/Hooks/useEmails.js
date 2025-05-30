import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../Features/LoaderSlice";
import database from "../AppwriteServices/Database";
import { formatEmailData } from "../Helpers/HelperTableFunctions";
import { showErrorMessage, showSuccessMessage } from "../Helpers/HelperAlertFunctions";
import { errorMessages, successMessages } from "../Helpers/HelperAlertMessages";
import { addToSent, addToTrash, loadData, mailViewed, removeFromTrash, undoFromTrash } from "../Features/MailSlice";
import InboxJSON from "../Data/Inbox.json";
import SentJSON  from "../Data/Sent.json";
import TrashJSON from "../Data/Trash.json";
import { useNavigate } from "react-router-dom";
import file from "../AppwriteServices/File";
import { useCallback } from "react";

export function useEmails ()
{
  const dispatch = useDispatch ();
  const navigate = useNavigate ();

  /* --------------------------- SEND EMAIL -------------------------- */
  async function sendMail ( to, toName, subject, emailMessage, attachments, cc, bcc, senderEmail, ownerId, senderName )
  {
    /* ---------- 1. VALIDATION ---------- */

    if ( !to.trim () || !toName.trim () )
    {
      showErrorMessage ( dispatch, errorMessages.EMPTY_RECIPIENTS );
      return false;
    }

    if ( !subject )
    {
      showErrorMessage ( dispatch, errorMessages.EMPTY_SUBJECT );
      return false;
    }

    if ( !emailMessage )
    {
      showErrorMessage ( dispatch, errorMessages.EMPTY_MESSAGE );
      return false;
    }

    /* ---------- 2. DISPLAY LOADER ---------- */

    dispatch ( showLoader () );

    try
    {
      /* ---------- 3. UPLOAD ATTACHMENTS ---------- */

      let uploadedAttachments = [];

      if ( attachments.length )
      {
        const uploadResponse = await file.uploadFiles ( attachments );

        if ( !uploadResponse.status )
        {
          showErrorMessage ( dispatch, uploadResponse.message );
          return;
        }

        uploadedAttachments = uploadResponse.data.map ( ( file ) => file.$id );
      }

      /* ---------- 4. SEND EMAIL AND REDIRECT ---------- */

      const { status, message, data } = await database.sendEmail (
        {
          ownerId: ownerId,
          subject: subject,
          body: emailMessage,
          timestamp: new Date ().toISOString (),
          attachments: uploadedAttachments,
          senderName: senderName,
          senderEmail: senderEmail,
          receiverName: toName,
          receiverEmail: to,
          cc: cc,
          bcc: bcc,
        }
      );

      if ( !status )
      {
        showErrorMessage ( dispatch, message );
        return;
      }

      navigate ( "/landing-page" );

      /* ---------- 5. SAVE TO REDUX ---------- */

      dispatch ( addToSent ( data ) );

      /* ---------- 6. UI FEEDBACK ---------- */
      showSuccessMessage ( dispatch, successMessages.EMAIL_SENT );

      return true;
    }

    /* ---------- CATCHING ANY ERROR ---------- */

    catch ( error )
    {
      showErrorMessage (
        dispatch,
        errorMessages[ error.type?.toUpperCase () ]
          || error.message
          || errorMessages.DEFAULT
      );

      return false;
    }

    /* ---------- HIDE LOADER ---------- */

    finally
    {
      dispatch ( hideLoader () );
    }
  };


  /* ───────────────────────── FETCH EMAILS ───────────────────── */
  async function fetchEmails ( userId, signal )
  {
    dispatch ( showLoader () );

    try
    {
      /* ---------- 1. FETCH MAILS ---------- */

      const [ inboxResponse, sentResponse, trashResponse ] = await Promise.all (
        [
          database.getInboxEmails ( userId ),
          database.getSentEmails ( userId ),
          database.getTrashEmails ( userId ) ,
        ]
      );

      /* ---------- 2. FORMAT DATA ( API or JSON ) ---------- */

      const inbox = inboxResponse.status && inboxResponse.data.total > 0
        ? formatEmailData ( inboxResponse.data.documents )
        : formatEmailData ( InboxJSON );

      const sent = sentResponse.status && sentResponse.data.total > 0
        ? formatEmailData ( sentResponse.data.documents )
        : formatEmailData ( SentJSON );

      const trash = trashResponse.status && trashResponse.data.total > 0
        ? formatEmailData ( trashResponse.data.documents )
        : formatEmailData ( TrashJSON );

      console.log ( sentResponse );

      /* ---------- 3. STORE IN REDUX ---------- */

      if ( !signal?.aborted )
      {
        dispatch ( loadData ( { inbox, sent, trash } ) );
      }

      /* ---------- 4. UI FEEDBACK ---------- */

      if ( !inboxResponse.status ) showErrorMessage ( dispatch, inboxResponse.message, 1500 );
      if ( !sentResponse.status ) showErrorMessage ( dispatch, sentResponse.message, 1500 );
      if ( !trashResponse.status ) showErrorMessage ( dispatch, trashResponse.message, 1500 );

      if ( inboxResponse.status ) showSuccessMessage ( dispatch, inboxResponse.message, 1500 );
      if ( sentResponse.status  ) showSuccessMessage ( dispatch, sentResponse.message , 1500 );
      if ( trashResponse.status ) showSuccessMessage ( dispatch, trashResponse.message, 1500 );
    }

    /* ---------- CATCHING ANY ERROR ---------- */

    catch ( error )
    {
      if ( !signal?.aborted )
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
      if ( !signal?.aborted ) dispatch ( hideLoader () );
    }
  }

   /* ───────────────────────── GET ATTACHMENT INFO ───────────────────── */
  const getAttachmentInfo = useCallback (
    async ( fileId ) =>
    {
      try
      {
        const response = await file.getFullFileInfo ( fileId );

        if ( !response.status )
        {
          showErrorMessage ( dispatch, response.message );
          return null;
        }

        return response.data;
      }

      catch ( error )
      {
        showErrorMessage (
          dispatch,
          errorMessages[ error.type?.toUpperCase () ]
            || error.message
            || errorMessages.DEFAULT
        );
        return null;
      }
    },
    [ dispatch ],
  );

  /* ───────────────────────── MARK AS READ ───────────────────── */
  async function markRead ( id, folder )
  {
    try
    {
      const response = await database.markAsRead ( id );

      dispatch ( mailViewed ( { $id: id, folder } ) );        // Currently because API is not being used

      if ( !response.status )
      {
        showErrorMessage ( dispatch, response.message );
        return;
      }

      // dispatch ( mailViewed ( { $id: id, folder } ) );
    }

    catch ( error )
    {
      showErrorMessage (
        dispatch,
        errorMessages[ error.type?.toUpperCase () ]
          || error.message
          || errorMessages.DEFAULT
      );
    }
  }

  /* ───────────────────────── ADD-TO-TRASH ───────────────────── */
  async function moveToTrash ( email, folder, boolean = false )
  {
    try
    {
      const response = await database.moveToTrash ( email.$id );

      dispatch ( addToTrash ( { ...email, folder } ) );            // Currently because API is not being used

      if ( boolean ) navigate ( -1 );

      if ( !response.status )
      {
        showErrorMessage ( dispatch, response.message );
        return;
      }

      // dispatch ( addToTrash ( { ...email, folder } ) );
      // navigate ( -1 );
      showSuccessMessage ( dispatch, response.message );
    }

    catch ( error )
    {
      showErrorMessage (
        dispatch,
        errorMessages[ error.type?.toUpperCase() ] || error.message || errorMessages.DEFAULT
      );
    }
  }

  async function restoreFromTrash ( email )
  {
    try
    {
      const destination = email.originalFolder || "Inbox";
      const response  = await database.restoreEmail ( email.$id, destination );

      dispatch ( undoFromTrash ( email ) );                             // Currently because API is not being used

      if ( !response.status )
      {
        showErrorMessage ( dispatch, response.message );
        return;
      }

      // dispatch ( undoFromTrash ( email ) );
      showSuccessMessage ( dispatch, response.message );
    }

    catch ( error )
    {
      showErrorMessage ( dispatch, error.message || errorMessages.DEFAULT );
    }
  }

  /* ───────────────────────── PERMANENT DELETE ──────────────────────── */
  async function deleteFromTrash ( id, boolean = false )
  {
    try
    {
      const response = await database.deleteEmail ( id );

      dispatch ( removeFromTrash ( id ) );                        // Currently because API is not being used
      if ( boolean ) navigate ( -1 );

      if ( !response.status )
      {
        showErrorMessage ( dispatch, response.message );
        return;
      }

      // dispatch ( removeFromTrash ( id ) );
      // navigate ( -1 );
      showSuccessMessage ( dispatch, response.message );
    }

    catch ( error )
    {
      showErrorMessage ( dispatch, error.message || errorMessages.DEFAULT );
    }
  }

  return { sendMail, fetchEmails, getAttachmentInfo, markRead, moveToTrash, restoreFromTrash, deleteFromTrash };
}