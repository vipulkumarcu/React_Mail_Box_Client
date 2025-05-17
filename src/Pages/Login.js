import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authentication from "../FirebaseServices/Authentication";
import { setUser } from "../Features/UserSlice";
import { showSuccessMessage, showInfoMessage, showErrorMessage } from "../Helpers/HelperAlertFunctions";
import { errorMessages, successMessages } from "../Helpers/HelperAlertMessages";
import { Button, FormWrapper, InputBox } from "../Components";

function Login ()
{
  const [ email, setEmail ] = useState ( "" );
  const [ password, setPassword ] = useState ( "" );

  const navigate = useNavigate ();
  const dispatch = useDispatch ();

  async function loginHandler ( e )
  {
    e.preventDefault ();

    // ---------- validation ----------

    if ( !email || !password )
    {
      showErrorMessage ( dispatch, errorMessages.EMPTY_FIELDS );
      return;
    }

    // ---------- API ----------

    const response = await authentication.login ( email, password );

    if ( !response.status )
    {
      showErrorMessage ( dispatch, response.message );
      return;
    }

    // ---------- store & redirect ----------

    const { idToken, refreshToken, expiresIn, displayName } = response.data;

    dispatch ( setUser ( { idToken, refreshToken, expiresIn, displayName, email } ) );

    navigate ( "/landing-page" );

    showSuccessMessage ( dispatch, successMessages.LOGIN_SUCCESS, 1500 );

    showInfoMessage ( dispatch, `Welcome back${displayName ? `, ${displayName}` : ""}!` );

    // ---------- reset form ----------

    setEmail ( "" );
    setPassword ( "" );
  }

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