import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authentication from "../FirebaseServices/Authentication";
import database from "../FirebaseServices/Database";
import { setUser } from "../Features/UserSlice";
import { showLoader, hideLoader } from "../Features/LoaderSlice";
import { showSuccessMessage, showInfoMessage, showErrorMessage } from "../Helpers/HelperAlertFunctions";
import { errorMessages, successMessages } from "../Helpers/HelperAlertMessages";
import { Button, FormWrapper, InputBox } from "../Components";

function Signup ()
{
  const [ firstName, setFirstName ] = useState ( "" );
  const [ lastName, setLastName ] = useState ( "" );
  const [ email, setEmail ] = useState ( "" );
  const [ password, setPassword ] = useState ( "" );
  const [ confirmPassword, setConfirmPassword ] = useState ( "" );

  const navigate = useNavigate ();
  const dispatch = useDispatch ();

  async function signupHandler ( e )
  {
    e.preventDefault ();

    // ---------- validation ----------

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

    try
    {
      // ---------- API ----------

      dispatch ( showLoader () );

      const response = await authentication.signup ( email, password, `${firstName} ${lastName}` );

      if ( !response.status )
      {
        showErrorMessage ( dispatch, response.message );
        return;
      }

      const { idToken, refreshToken, expiresIn, displayName, localId } = response.data;

      // ---------- creating user in the database ----------

      console.log("Creating user with localId:", localId);

      const user = await database.createUser ( localId, idToken );


      console.log("User created:", user.data);

      if ( !user.status )
      {
        showErrorMessage ( dispatch, user.message );
        return;
      }

      // ---------- store & redirect ---------

      dispatch ( setUser ( { idToken, refreshToken, expiresIn, displayName, email, localId } ) );

      navigate ( "/landing-page" );

      showSuccessMessage ( dispatch, successMessages.SIGNUP_SUCCESS, 1500 );

      showInfoMessage ( dispatch, `Welcome aboard, ${firstName}!` );

      const getresponse = await database.getUser ( localId, idToken );

      console.log("User data:", getresponse);

      // ---------- reset form ----------

      setFirstName ( "" );
      setLastName ( "" );
      setEmail ( "" );
      setPassword ( "" );
      setConfirmPassword ( "" );
    }

    finally
    {
      dispatch ( hideLoader () );
    }
  }

  return (
    <>
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


    </>
  );
}

export default Signup;