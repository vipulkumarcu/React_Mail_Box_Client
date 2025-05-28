import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoader, showLoader } from "../Features/LoaderSlice";
import { showErrorMessage, showInfoMessage, showSuccessMessage } from "../Helpers/HelperAlertFunctions";
import { errorMessages, successMessages } from "../Helpers/HelperAlertMessages";
import { clearUser, setUser } from "../Features/UserSlice";
import authentication from "../AppwriteServices/Authentication";
import { resetMailState } from "../Features/MailSlice";

export function useAuthenticate ()
{
  const dispatch = useDispatch ();
  const navigate = useNavigate ();

  async function signup ( { firstName, lastName, email, password, confirmPassword } )
  {
    /* ---------- 1. VALIDATION ---------- */

    if ( !firstName || !lastName || !email || !password || !confirmPassword )
    {
      showErrorMessage ( dispatch, errorMessages.EMPTY_FIELDS );
      return;
    }

    if ( password.length < 6 )
    {
      showErrorMessage ( dispatch, errorMessages.WEAK_PASSWORD );
      return;
    }

    if ( password !== confirmPassword )
    {
      showErrorMessage ( dispatch, errorMessages.PASSWORDS_DO_NOT_MATCH );
      return;
    }

    /* ---------- 2. DISPLAY LOADER ---------- */

    dispatch ( showLoader () );

    try
    {
      /* ---------- 3. SIGNUP USER AND REDIRECT ---------- */

      const { status, message, data } = await authentication.signup ( email, password, `${firstName} ${lastName}` );

      if ( !status )
      {
        showErrorMessage ( dispatch, message );
        return;
      }

      const { user, session } = data;

      /* ---------- 4. SAVE TO REDUX ---------- */

      dispatch (
        setUser (
          {
            userId   : user.$id,
            userName : user.name,
            userEmail: user.email,
            sessionId: session.$id,
            expiresIn: session.expire,
          }
        )
      );

      /* ---------- 5. UI FEEDBACK ---------- */

      navigate ( "/landing-page" );

      showSuccessMessage ( dispatch, successMessages.SIGNUP_SUCCESS, 1500 );

      showSuccessMessage ( dispatch, successMessages.USER_CREATED, 1500 );

      showInfoMessage ( dispatch, `Welcome aboard, ${ firstName } !` );

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
    }

    /* ---------- HIDE LOADER ---------- */

    finally
    {
      dispatch ( hideLoader () );
    }
  }

  async function login ( { email, password } )
  {
    /* ---------- 1. VALIDATION ---------- */

    if ( !email || !password )
    {
      showErrorMessage ( dispatch, errorMessages.EMPTY_FIELDS );
      return;
    }

    /* ---------- 2. DISPLAY LOADER ---------- */

    dispatch ( showLoader () );

    try
    {
      /* ---------- 3. LOGIN USER AND REDIRECT ---------- */

      const loginResponse = await authentication.login ( email, password );

      if ( !loginResponse.status || !loginResponse.data )
      {
        showErrorMessage ( dispatch, loginResponse.message );
        return;
      }

      const sessionData = loginResponse.data;

      /* ---------- 4. FETCH USER DATA ---------- */

      const userDataResponse = await authentication.getUserData ();

      if ( !userDataResponse.status )
      {
        showErrorMessage ( dispatch, userDataResponse.message );
        return;
      }

      const user = userDataResponse.data;

      /* ---------- 3. STORE IN REDUX AND LOCAL STORAGE ---------- */

      dispatch (
        setUser (
          {
            userId   : user.$id,
            userName : user.name,
            userEmail: user.email,
            sessionId: sessionData.$id,
            expiresIn: sessionData.expire, // ISO string
          }
        )
      );

      /* ---------- 4. UI FEEDBACK ---------- */

      showSuccessMessage ( dispatch, successMessages.LOGIN_SUCCESS, 1500 );

      showInfoMessage ( dispatch, `Welcome back${ user.name ? `, ${ user.name }` : "" }!` );

      /* ---------- 5. NAVIGATE ---------- */

      dispatch ( resetMailState () );
      navigate ( "/landing-page" );
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
    }

    /* ---------- HIDE LOADER ---------- */

    finally
    {
      dispatch ( hideLoader () );
    }
  }

  async function logout ()
  {
    await authentication.logout ();
    dispatch ( clearUser () );
    navigate ( "/" );
    showSuccessMessage ( dispatch, successMessages.LOGOUT_SUCCESS );
  };

  return { signup, login, logout };
}