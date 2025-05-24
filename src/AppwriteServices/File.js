import { Client, ID, Storage } from "appwrite";
import environmentVariables from "../EnvironmentVariables/EnvironmentVariables";
import { errorMessages, successMessages } from "../Helpers/HelperAlertMessages";


// ─────────────────────  ENVIRONMENT VARIABLES  ─────────────────────
const { appwriteEndpointUrl, appwriteProjectId, appwriteStorageId } = environmentVariables;


// ─────────────────────  MAPPING ERROR CORRECTLY  ─────────────────────
function mapError ( errorType, fallbackKey )
{
  if ( !errorType ) return errorMessages[ fallbackKey ] || errorMessages.DEFAULT;

  const key = errorType.toUpperCase();

  return errorMessages[ key ] || errorMessages[ fallbackKey ] || errorMessages.DEFAULT;
}


// ───────────────────── FILE ─────────────────────
class File
{
  client = new Client ();
  storage;

  constructor ()
  {
    this.client
      .setEndpoint ( appwriteEndpointUrl )
      .setProject ( appwriteProjectId );

    this.storage = new Storage ( this.client );
  }


  /* ─────────── UPLOAD ONE OR MANY FILES ─────────── */
  async uploadFiles ( files = [] )
  {
    try
    {
      /* --------------- Upload file(s) --------------- */

      /* 1. convert FileList → array & upload in parallel */
      const fileArray = Array.from ( files );
      const uploadTasks = fileArray.map (
        ( file ) => this.storage.createFile ( appwriteStorageId, ID.unique (), file )
      );

      /* 2. resolves to array of file objects */
      const uploaded = await Promise.all ( uploadTasks );

      /* --------------- Success --------------- */
      return {
        // const { status, message, data } = response;
        status: true,
        message: successMessages.FILE_UPLOADED,
        data: uploaded,
      };
    }

    /* --------------- Catching any error --------------- */
    catch ( error )
    {
      return {
        // const { status, message } = response;
        status: false,
        message: mapError ( error.type, "FILE_UPLOAD_FAILED" ),
      };
    }
  }

  /* ─────────── GET DOWNLOAD URL ─────────── */
  async getDownloadURL ( fileId )
  {
    try
    {
      /* --------------- Get download url --------------- */
      const url = this.storage.getFileDownload ( appwriteStorageId, fileId );

      /* --------------- Success --------------- */
      return {
        // const { status, message, data } = response;
        status: true,
        message: successMessages.FILE_URL_GENERATED,
        data: url,
      };
    }

    /* --------------- Catching any error --------------- */
    catch ( error )
    {
      return {
        // const { status, message } = response;
        status: false,
        message: mapError ( error.type, "FILE_URL_FAILED" ),
      };
    }
  }

  /* ─────────── DELETE FILE ─────────── */
  async deleteFile ( fileId )
  {
    try
    {
      /* --------------- Delete file(s) --------------- */
      await this.storage.deleteFile ( appwriteStorageId, fileId );

      /* --------------- Success --------------- */
      return {
        // const { status, message } = response;
        status: true,
        message: successMessages.FILE_DELETED,
      };
    }

    /* --------------- Catching any error --------------- */
    catch ( error )
    {
      return {
        // const { status, message } = response;
        status: false,
        message: mapError ( error.type, "FILE_DELETION_FAILED" ),
      };
    }
  }
}


// ─────────────────────  EXPORT ─────────────────────
const file = new File ();

export default file;