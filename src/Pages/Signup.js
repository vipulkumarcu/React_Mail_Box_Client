import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authentication from "../AppwriteServices/Authentication";
import { setUser } from "../Features/UserSlice";
import { showLoader, hideLoader } from "../Features/LoaderSlice";
import { showSuccessMessage, showInfoMessage, showErrorMessage } from "../Helpers/HelperAlertFunctions";
import { errorMessages, successMessages } from "../Helpers/HelperAlertMessages";
import { Button, FormWrapper, InputBox } from "../Components";

function Signup ()
{
  /* ───────────────────────── FORM STATES ───────────────────────── */
  const [ firstName, setFirstName ] = useState ( "" );
  const [ lastName, setLastName ] = useState ( "" );
  const [ email, setEmail ] = useState ( "" );
  const [ password, setPassword ] = useState ( "" );
  const [ confirmPassword, setConfirmPassword ] = useState ( "" );

  /* ───────────────────────── HOOKS ───────────────────────── */
  const navigate = useNavigate ();
  const dispatch = useDispatch ();

  /* ───────────────────────── SIGNUP HANDLER ───────────────────────── */
  async function signupHandler ( event )
  {
    event.preventDefault ();

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

      navigate ( "/landing-page" );

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

      showSuccessMessage ( dispatch, successMessages.SIGNUP_SUCCESS, 1500 );

      showSuccessMessage ( dispatch, successMessages.USER_CREATED, 1500 );

      showInfoMessage ( dispatch, `Welcome aboard, ${ firstName } !` );

      /* ---------- 6. RESET FORM ---------- */

      setFirstName ( "" );
      setLastName ( "" );
      setEmail ( "" );
      setPassword ( "" );
      setConfirmPassword ( "" );
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
    <FormWrapper title = "Signup" buttonText = "Already have an account ? Login" link = "/login" >

      <form onSubmit = { signupHandler } >

        <div className = "flex flex-wrap -mx-3" >

          <div className = "w-full md:w-1/2 px-3 mb-6 md:mb-0" >
            <InputBox
              placeholder = "First Name"
              type = "text"
              label = "First Name"
              value = { firstName }
              onChange = { e => setFirstName ( e.target.value ) }
            />
          </div>

          <div className = "w-full md:w-1/2 px-3" >
            <InputBox
              placeholder = "Last Name"
              type = "text"
              label = "Last Name"
              value = { lastName }
              onChange = { e => setLastName ( e.target.value ) }
            />
          </div>

        </div>

        <div className = "flex flex-wrap -mx-3" >
          <div className = "w-full px-3">
            <InputBox
            placeholder = "Email"
            type = "email"
            label = "Email"
            value = { email }
            onChange = { e => setEmail ( e.target.value ) }
          />
          </div>
        </div>

        <div className = "flex flex-wrap -mx-3" >
          <div className = "w-full px-3">
            <InputBox
            placeholder = "Password"
            type = "password"
            label = "Password"
            value = { password }
            onChange = { e => setPassword ( e.target.value ) }
          />
          </div>
        </div>

        <div className = "flex flex-wrap -mx-3" >
          <div className = "w-full px-3">
            <InputBox
            placeholder = "Confirm Password"
            type = "password"
            label = "Confirm Password"
            value = { confirmPassword }
            onChange = { e => setConfirmPassword ( e.target.value ) }
          />
          </div>
        </div>

        <div className = "flex justify-center align-center mb-3" >
          <Button buttonText = "Register me" type = "Submit" />
        </div>

      </form>

    </FormWrapper>
  );
}

export default Signup;