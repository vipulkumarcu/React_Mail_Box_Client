import { Client, Account, ID } from "appwrite";
import EnvironmentVariables from "../EnvironmentVariables/EnvironmentVariables";
import { errorMessages, successMessages } from "../Helpers/HelperAlertMessages";


// ─────────────────────  ENVIRONMENT VARIABLES  ─────────────────────
const { appwriteEndpointUrl, appwriteProjectId } = EnvironmentVariables;


// ─────────────────────  MAPPING ERROR CORRECTLY  ─────────────────────
function mapError ( errorType, fallbackKey )
{
  if ( !errorType )
    return errorMessages[ fallbackKey ] || errorMessages.DEFAULT;

  const key = errorType.toUpperCase();

  return (
    errorMessages[ key ] ||
    errorMessages[ fallbackKey ] ||
    errorMessages.DEFAULT
  );
}


// ───────────────────── USER AUTHENTICATION  ─────────────────────
class Authentication
{
  client  = new Client ();
  account;

  constructor ()
  {
    this.client
      .setEndpoint ( appwriteEndpointUrl )
      .setProject  ( appwriteProjectId );

    this.account = new Account ( this.client );
  }

  /* ─────────────────────  SIGN-UP  ───────────────────── */
  async signup ( email, password, name )
  {
    try
    {
      /* ---------- Guard ---------- */
      if ( !email || !password || !name )
      {
        return {
          status : false,
          message: errorMessages.SIGNUP_FALLBACK,
        };
      }

      /* --------------- 1. Create the user --------------- */
      const userResponse = await this.account.create (
        ID.unique (),
        email,
        password,
        name
      );

      /* --------------- 2. Auto-login the new user --------------- */
      const loginResponse = await this.login ( email, password );

      /* --------------- Error --------------- */
      if ( !loginResponse.status )
      {
        return {
          status : false,
          message: loginResponse.message,
        };
      }

      /* --------------- Success --------------- */
      return {
        status : true,
        message: successMessages.SIGNUP_SUCCESS,
        data   : {
          user   : userResponse,            // { $id, name, email, ... }
          session: loginResponse.data,      // { $id, userId, expire, ... }
        },
      };
    }

    /* --------------- Catching any error --------------- */
    catch ( error )
    {
      return {
        status : false,
        message: mapError ( error.type, "SIGNUP_FALLBACK" ),
      };
    }
  }

  /* ─────────────────────  LOGIN  ───────────────────── */
  async login ( email, password )
  {
    try
    {
      /* ---------- Guard ---------- */
      if ( !email || !password )
      {
        return {
          status : false,
          message: errorMessages.LOGIN_FALLBACK,
        };
      }

      /* --------------- Create a session --------------- */
      const sessionResponse = await this.account.createEmailPasswordSession (
        email,
        password
      );

      /* --------------- Success --------------- */
      return {
        status : true,
        message: successMessages.LOGIN_SUCCESS,
        data   : sessionResponse,      // { $id, userId, expire, ... }
      };
    }

    /* --------------- Catching any error --------------- */
    catch ( error )
    {
      return {
        status : false,
        message: mapError ( error.type, "LOGIN_FALLBACK" ),
      };
    }
  }

  /* ─────────────────────  GET USER  ───────────────────── */
  async getUserData ()
  {
    try
    {
      /* --------------- Get user data --------------- */
      const userDataResponse = await this.account.get ();

      /* --------------- Success --------------- */
      return {
        status : true,
        message: successMessages.GET_USER_SUCCESS,
        data   : userDataResponse,     // { $id, name, email }
      };
    }

    /* --------------- Catching any error --------------- */
    catch ( error )
    {
      return {
        status : false,
        message: mapError ( error.type, "GET_USER_FALLBACK" ),
      };
    }
  }

  /* ─────────────────────  LOGOUT  ───────────────────── */
  async logout ()
  {
    try
    {
      /* --------------- Delete all the sessions --------------- */
      await this.account.deleteSessions ();

      /* --------------- Success --------------- */
      return {
        status : true,
        message: successMessages.LOGOUT_SUCCESS,
      };
    }

    /* --------------- Catching any error --------------- */
    catch ( error )
    {
      return {
        status : false,
        message: mapError ( error.type, "LOGOUT_FALLBACK" ),
      };
    }
  }

  /* ─────────────────────  UPDATE USER SESSION  ───────────────────── */
  async updateUserSession ( sessionId )
  {
    try
    {
      /* ---------- Guard ---------- */
      if ( !sessionId )
      {
        return {
          status : false,
          message: errorMessages.UPDATE_SESSION_FALLBACK,
        };
      }

      /* --------------- Update user session --------------- */
      const newSessionResponse = await this.account.updateSession (
        sessionId
      );

      /* --------------- Success --------------- */
      return {
        status : true,
        message: successMessages.TOKEN_REFRESHED,
        data : newSessionResponse,   // { $id, userId, expire, ... }
      };
    }

    /* --------------- Catching any error --------------- */
    catch ( error )
    {
      return {
        status : false,
        message: mapError ( error.type, "UPDATE_SESSION_FALLBACK" ),
      };
    }
  }
}


// ─────────────────────  EXPORTING OBJECT  ─────────────────────
const authentication = new Authentication ();

export default authentication;