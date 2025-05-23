import { Client, Account, ID } from "appwrite";
import EnvironmentVariables from "../EnvironmentVariables/EnvironmentVariables";
import { errorMessages, successMessages } from "../Helpers/HelperAlertMessages";

// ─────────────────────  MAPPING ERROR CORRECTLY  ─────────────────────
function mapError ( errorType, fallbackKey )
{
  if ( !errorType ) return errorMessages[ fallbackKey ] || errorMessages.DEFAULT;

  const key = errorType.toUpperCase();

  return errorMessages[ key ] || errorMessages[ fallbackKey ] || errorMessages.DEFAULT;
}

// ───────────────────── USER AUTHENTICATION  ─────────────────────
class Authentication
{
  client = new Client ();
  account;

  constructor ()
  {
    this.client
      .setEndpoint ( EnvironmentVariables.appwriteEndpointUrl )
      .setProject ( EnvironmentVariables.appwriteProjectId );

    this.account = new Account ( this.client );
  }

  /* ─────────────────────  SIGN-UP  ───────────────────── */
  async signup ( email, password, name )
  {
    try
    {
      /* --------------- 1. Create the user --------------- */
      const userResponse = await this.account.create ( ID.unique (), email, password, name );

      /* --------------- 2. Auto-login the new user --------------- */
      const loginResponse = await this.login ( email, password );

      /* --------------- Error --------------- */
      if ( !loginResponse.status )
      {
        // const { status, message } = response;
        return {
          status: false,
          message: loginResponse.message,
        };
      }

      /* --------------- Success --------------- */
      return {
        // const { status, message, data } = response;
        // const { user, session } = data;
        status: true,
        message: successMessages.SIGNUP_SUCCESS,
        data: {
          user: userResponse,                 // { $id: userId, name, email,... }
          session: loginResponse.data         // { $id: sessionId, userId, expire,... }
        },
      };
    }

    /* --------------- Catching any error --------------- */
    catch ( error )
    {
      // const { status, message } = response;
      return {
        status: false,
        message: mapError ( error.type, "SIGNUP_FALLBACK" ),
      };
    }
  }

  /* ─────────────────────  LOGIN  ───────────────────── */
  async login ( email, password )
  {
    try
    {
      /* --------------- Create a session --------------- */
      const sessionResponse = await this.account.createEmailPasswordSession ( email, password );

      /* --------------- Success --------------- */
      return {
        // const { status, message, data } = response;
        status: true,
        message: successMessages.LOGIN_SUCCESS,
        data: sessionResponse,      // { $id, userId, expire,...}
      };
    }

    /* --------------- Catching any error --------------- */
    catch ( error )
    {
      // const { status, message } = response;
      return {
        status: false,
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
        // const { status, message, data } = response;
        status: true,
        message: successMessages.GET_USER_SUCCESS,
        data: userDataResponse,     // { $id: userId, name, email }
      }
    }

    /* --------------- Catching any error --------------- */
    catch ( error )
    {
      // const { status, message } = response;
      return {
        status: false,
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
        // const { status, message } = response;
        status: true,
        message: successMessages.LOGOUT_SUCCESS,
      };
    }

    /* --------------- Catching any error --------------- */
    catch ( error )
    {
      return {
        // const { status, message } = response;
        status: false,
        message: mapError ( error.type, "LOGOUT_FALLBACK" ),
      };
    }
  }

  /* ─────────────────────  UPDATE USER SESSION  ───────────────────── */
  async updateUserSession ( sessionId )
  {
    try
    {
      /* --------------- Update user session --------------- */
      const newSessionResponse = await this.account.updateSession ( sessionId );

      /* --------------- Success --------------- */
      return {
        // const { status, message, data } = response;
        status: true,
        message: successMessages.TOKEN_REFRESHED,
        data: newSessionResponse,      // { $id: sessionId, userId, expire,... }
      };
    }

    /* --------------- Catching any error --------------- */
    catch ( error )
    {
      return {
        // const { status, message } = response;
        status: false,
        message: mapError ( error.type, "UPDATE_SESSION_FALLBACK" ),
      };
    }
  }
}

const authentication = new Authentication ();

export default authentication;