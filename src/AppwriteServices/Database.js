import { Client, Databases, ID, Query } from "appwrite";
import EnvironmentVariables from "../EnvironmentVariables/EnvironmentVariables";
import { errorMessages, successMessages } from "../Helpers/HelperAlertMessages";


// ─────────────────────  ENVIRONMENT VARIABLES  ─────────────────────
const { appwriteEndpointUrl, appwriteProjectId, appwriteDatabaseId, appwriteEmailsCollectionId } = EnvironmentVariables;


// ─────────────────────  MAPPING ERROR CORRECTLY  ─────────────────────
function mapError ( errorType, fallbackKey )
{
  if ( !errorType ) return errorMessages[ fallbackKey ] || errorMessages.DEFAULT;

  const key = errorType.toUpperCase();

  return errorMessages[ key ] || errorMessages[ fallbackKey ] || errorMessages.DEFAULT;
}


// ───────────────────── DATABASE ─────────────────────
class Database
{
  client = new Client ();
  databases;

  constructor ()
  {
    this.client
      .setEndpoint ( appwriteEndpointUrl )
      .setProject ( appwriteProjectId );

    this.databases = new Databases ( this.client );
  }

  /* ─────────── SEND EMAIL ─────────── */
  async sendEmail (
    {
      ownerId,
      folder = "Sent",
      subject,
      body,
      timestamp,
      attachments = [],
      senderName,
      senderEmail,
      receiverName,
      receiverEmail,
      cc = [],
      bcc = [],
      isRead = false,
    }
  )
  {
    try
    {
      /* --------------- Create email document --------------- */
      const emailDoc = await this.databases.createDocument (
        appwriteDatabaseId,
        appwriteEmailsCollectionId,
        ID.unique (),
        {
          ownerId,
          folder,
          subject,
          body,
          timestamp,
          attachments : attachments,
          senderName,
          senderEmail,
          receiverName,
          receiverEmail,
          cc,
          bcc,
          isRead,
        }
      );

      /* --------------- Success --------------- */
      return {
        // const { status, message, data } = response;
        status: true,
        message: successMessages.EMAIL_SENT,
        data: emailDoc,
      };
    }

    /* --------------- Catching any error --------------- */
    catch ( error )
    {
      return {
        // const { status, message } = response;
        status: false,
        message: mapError ( error.type, "MAIL_SEND_FAILED" ),
      };
    }
  }

  /* ─────────── MOVE EMAIL TO TRASH ─────────── */
  async markAsRead ( mailId )
  {
    try
    {
      /* --------------- Update email document --------------- */
      const updatedEmailResponse = await this.databases.updateDocument (
        appwriteDatabaseId,
        appwriteEmailsCollectionId,
        mailId,
        {
          isRead: true,
        }
      );

      /* --------------- Success --------------- */
      return {
        // const { status, message, data } = response;
        status: true,
        message: successMessages.EMAIL_UPDATED,
        data: updatedEmailResponse,
      };
    }

    /* --------------- Catching any error --------------- */
    catch ( error )
    {
      return {
        // const { status, message } = response;
        status: false,
        message: mapError ( error.type, "MAIL_UPDATE_FAILED" ),
      }
    }
  }

  /* ─────────── MOVE EMAIL TO TRASH ─────────── */
  async moveToTrash ( mailId )
  {
    try
    {
      /* --------------- Update email document --------------- */
      const updatedEmailResponse = await this.databases.updateDocument (
        appwriteDatabaseId,
        appwriteEmailsCollectionId,
        mailId,
        { folder: "Trash" }
      );

      /* --------------- Success --------------- */
      return {
        // const { status, message, data } = response;
        status: true,
        message: successMessages.EMAIL_MOVED_TO_TRASH,
        data: updatedEmailResponse,
      };
    }

    /* --------------- Catching any error --------------- */
    catch ( error )
    {
      return {
        // const { status, message } = response;
        status: false,
        message: mapError ( error.type, "MAIL_TRASH_FAILED" ),
      }
    }
  }

  /* ─────────── DELETE EMAIL ─────────── */
  async deleteEmail ( mailId )
  {
    try
    {
      /* --------------- Delete email document --------------- */
      await this.databases.deleteDocument (
        appwriteDatabaseId,
        appwriteEmailsCollectionId,
        mailId
      );

      /* --------------- Success --------------- */
      return {
        // const { status, message, data } = response;
        status: true,
        message: successMessages.EMAIL_DELETED,
      };
    }

    /* --------------- Catching any error --------------- */
    catch ( error )
    {
      return {
        // const { status, message } = response;
        status: false,
        message: mapError ( error.type, "MAIL_DELETION_FAILED" ),
      }
    }
  }

  /* ─────────── RESTORE EMAIL ( Trash → Inbox / Sent ) ─────────── */
  async restoreEmail ( mailId, destinationFolder )
  {
    try
    {
      /* ------------ Restore email ------------ */
      const updated = await this.databases.updateDocument (
        appwriteDatabaseId,
        appwriteEmailsCollectionId,
        mailId,
        { folder: destinationFolder }
      );

      return {
        // const { status, message, data } = response;
        status: true,
        message: successMessages.EMAIL_RESTORED,
        data: updated,
      };
    }

    catch ( error )
    {
      return {
        // const { status, message } = response;
        status: false,
        message: mapError ( error.type, "MAIL_RESTORE_FAILED" ),
      };
    }
  }

  /* ─────────── GET INBOX EMAILS ─────────── */
  async getInboxEmails ( userId )
  {
    try
    {
      /* --------------- Get inbox emails --------------- */
      const inboxResponse = await this.databases.listDocuments (
        appwriteDatabaseId,
        appwriteEmailsCollectionId,
        [
          Query.equal ( "ownerId", userId ),
          Query.equal ( "folder", "Inbox" ),
          Query.orderDesc ( "timestamp" ),
          Query.limit ( 20 ),
        ]
      );

      /* --------------- Success --------------- */
      return {
        // const { status, message, data } = response;
        status: true,
        message: successMessages.GET_INBOX_SUCCESS,
        data: inboxResponse,
      }
    }

    /* --------------- Catching any error --------------- */
    catch ( error )
    {
      return {
        // const { status, message } = response;
        status: false,
        message: mapError ( error.type, "GET_INBOX_FAILED" ),
      }
    }
  }

  /* ─────────── GET SENT EMAILS ─────────── */
  async getSentEmails ( userId )
  {
    try
    {
      /* --------------- Get sent emails --------------- */
      const sentResponse = await this.databases.listDocuments (
        appwriteDatabaseId,
        appwriteEmailsCollectionId,
        [
          Query.equal ( "ownerId", userId ),
          Query.equal ( "folder", "Sent" ),
          Query.orderDesc ( "timestamp" ),
          Query.limit ( 20 ),
        ]
      );

      /* --------------- Success --------------- */
      return {
        // const { status, message, data } = response;
        status: true,
        message: successMessages.GET_SENT_SUCCESS,
        data: sentResponse,
      }
    }

    /* --------------- Catching any error --------------- */
    catch ( error )
    {
      return {
        // const { status, message } = response;
        status: false,
        message: mapError ( error.type, "GET_SENT_FAILED" ),
      }
    }
  }

  /* ─────────── GET TRASH EMAILS ─────────── */
  async getTrashEmails ( userId )
  {
    try
    {
      /* --------------- Get trash emails --------------- */
      const trashResponse = await this.databases.listDocuments (
        appwriteDatabaseId,
        appwriteEmailsCollectionId,
        [
          Query.equal ( "ownerId", userId ),
          Query.equal ( "folder", "Trash" ),
          Query.orderDesc ( "timestamp" ),
          Query.limit ( 20 ),
        ]
      );

      /* --------------- Success --------------- */
      return {
        // const { status, message, data } = response;
        status: true,
        message: successMessages.GET_TRASH_SUCCESS,
        data: trashResponse,
      }
    }

    /* --------------- Catching any error --------------- */
    catch ( error )
    {
      return {
        // const { status, message } = response;
        status: false,
        message: mapError ( error.type, "GET_TRASH_FAILED" ),
      }
    }
  }
}


// ─────────────────────  EXPORT ─────────────────────
const database = new Database ();

export default database;