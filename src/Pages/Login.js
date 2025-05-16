import { useState } from "react";
import { Button, FormWrapper, InputBox } from "../Components";
import { useDispatch } from "react-redux";
import { enqueueAlert } from "../Features/AlertSlice";
import authentication from "../FirebaseServices/Authentication";
import { setUser } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";

function Login ()
{
  const [ email, setEmail ] = useState ( "" );
  const [ password, setPassword ] = useState ( "" );

  const navigate = useNavigate ();
  const dispatch = useDispatch ();

  const firebaseErrorMap = {
    EMAIL_NOT_FOUND: "No user found with this email.",
    INVALID_PASSWORD: "The password is incorrect.",
    USER_DISABLED: "This user account has been disabled.",
  };

  async function loginHandler ( e )
  {
    e.preventDefault ();

    // ---------- validation ----------

    if ( !email || !password )
    {
      dispatch (
        enqueueAlert (
          {
            type: "error",
            message: "Please enter both email and password.",
          }
        )
      );
      return;
    }

    // ---------- API ----------

    const response = await authentication.login(email, password);

    if ( !response.status )
    {
      dispatch (
        enqueueAlert (
          {
            type: "error",
            message: firebaseErrorMap[response.message] || "Login failed, please check your credentials."
          }
        )
      );

      return;
    }

    // ---------- store & redirect ----------

    const { idToken, refreshToken, expiresIn, displayName } = response.data;

    dispatch ( setUser ( { idToken, refreshToken, expiresIn, displayName, email } ) );

    navigate ( "/landing-page" );

    dispatch (
      enqueueAlert (
        {
          type: "success",
          message: `Welcome back${displayName ? `, ${displayName}` : ""}!`,
        }
      )
    );

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