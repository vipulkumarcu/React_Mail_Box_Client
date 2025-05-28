import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authentication from "../AppwriteServices/Authentication";
import { setUser } from "../Features/UserSlice";
import { showLoader, hideLoader } from "../Features/LoaderSlice";
import { showSuccessMessage, showInfoMessage, showErrorMessage } from "../Helpers/HelperAlertFunctions";
import { errorMessages, successMessages } from "../Helpers/HelperAlertMessages";
import { Button, FormWrapper, InputBox } from "../Components";
import { resetMailState } from "../Features/MailSlice";

function Login ()
{
  /* ───────────────────────── FORM STATES ───────────────────────── */
  const [ email, setEmail ] = useState ( "" );
  const [ password, setPassword ] = useState ( "" );

  /* ───────────────────────── HOOKS ───────────────────────── */
  const navigate = useNavigate ();
  const dispatch = useDispatch ();

  /* ───────────────────────── LOGIN HANDLER ───────────────────────── */
  async function loginHandler ( event )
  {
    event.preventDefault ();

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

      /* ---------- 6. RESET FORM ---------- */

      setEmail ( "" );
      setPassword ( "" );
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

  /* ───────────────────────── JSX ───────────────────────── */
  return (
    <FormWrapper title = "Login" buttonText = "Don't have an account ? Register" link = "/signup" >

      <form onSubmit = { loginHandler } >

        <div className = "mb-4" >
            <InputBox
              placeholder = "Email"
              type = "email"
              label = "Email"
              value = { email }
              onChange = { e => setEmail ( e.target.value ) }
            />
        </div>

        <div className = "mb-6" >
            <InputBox
              placeholder = "Password"
              type = "password"
              label = "Password"
              value = { password }
              onChange = { e => setPassword ( e.target.value ) }
            />
        </div>

        <div className = "flex justify-center align-center gap-8 mb-3" >
          <Button buttonText = "Login" type = "Submit" />
          <Button
            className = "text-md text-lime-800 hover:text-green-700 underline underline-offset-2 transition-all duration-200 hover:scale-105"
            // onClick = { () => navigate ( "/forgot-password" ) }
            buttonText = "Forgot Password ?"
          />
        </div>

      </form>

    </FormWrapper>
  );
}

export default Login;