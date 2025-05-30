import { Client, ID, Storage } from "appwrite";
import environmentVariables from "../EnvironmentVariables/EnvironmentVariables";
import { errorMessages, successMessages } from "../Helpers/HelperAlertMessages";


// ─────────────────────  ENVIRONMENT VARIABLES  ─────────────────────
const { appwriteEndpointUrl, appwriteProjectId, appwriteStorageId, } = environmentVariables;


// ─────────────────────  MAPPING ERROR CORRECTLY  ─────────────────────
function mapError ( errorType, fallbackKey )
{
  if ( !errorType ) return errorMessages[ fallbackKey ] || errorMessages.DEFAULT;

  const key = errorType.toUpperCase();

  return (
    errorMessages[ key ] || errorMessages[ fallbackKey ] || errorMessages.DEFAULT
  );
}


// ───────────────────── FILE ─────────────────────
class File
{
  client  = new Client ();
  storage;

  constructor ()
  {
    this.client
      .setEndpoint ( appwriteEndpointUrl )
      .setProject  ( appwriteProjectId );

    this.storage = new Storage ( this.client );
  }


  /* ─────────── UPLOAD ONE OR MANY FILES ─────────── */
  async uploadFiles ( files = [] )
  {
    try
    {
      /* ---------- Guard ---------- */
      if ( !files || files.length === 0 )
      {
        return {
          status : false,
          message: errorMessages.EMPTY_FILES,
        };
      }

      /* --------------- Upload file(s) --------------- */

      /* 1. convert FileList → array & upload in parallel */
      const fileArray   = Array.from ( files );
      const uploadTasks = fileArray.map (
        ( file ) =>
          this.storage.createFile ( appwriteStorageId, ID.unique (), file )
      );

      /* 2. resolves to array of file objects */
      const uploaded = await Promise.all ( uploadTasks );

      /* --------------- Success --------------- */
      return {
        status : true,
        message: successMessages.FILE_UPLOADED,
        data   : uploaded,
      };
    }

    /* --------------- Catching any error --------------- */
    catch ( error )
    {
      return {
        status : false,
        message: mapError ( error.type, "FILE_UPLOAD_FAILED" ),
      };
    }
  }

  /* ─────────── GET ATTACHMENTS META DATA & URL ─────────── */
  async getFullFileInfo ( fileId )
  {
    try
    {
      /* --------------- Get file meta data & url --------------- */
      const [ fileMeta, downloadUrl ] = await Promise.all (
        [
          this.storage.getFile        ( appwriteStorageId, fileId ),
          this.storage.getFileDownload( appwriteStorageId, fileId ),
        ]
      );

      /* --------------- Success --------------- */
      return {
        status : true,
        message: successMessages.FILE_META_FETCHED,
        data   : {
          $id         : fileMeta.$id,
          name        : fileMeta.name,
          size        : fileMeta.sizeOriginal,
          type        : fileMeta.mimeType,
          downloadUrl,
          url         : downloadUrl,
        },
      };
    }

    /* --------------- Catching any error --------------- */
    catch ( error )
    {
      return {
        status : false,
        message: mapError ( error.type, "FILE_META_FAILED" ),
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
        status : true,
        message: successMessages.FILE_DELETED,
      };
    }

    /* --------------- Catching any error --------------- */
    catch ( error )
    {
      return {
        status : false,
        message: mapError ( error.type, "FILE_DELETION_FAILED" ),
      };
    }
  }
}


// ─────────────────────  EXPORT ─────────────────────
const file = new File ();

export default file;