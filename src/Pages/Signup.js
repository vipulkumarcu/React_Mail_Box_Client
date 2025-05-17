import { useState } from "react";
import { Button, FormWrapper, InputBox } from "../Components";
import { useDispatch } from "react-redux";
import { enqueueAlert } from "../Features/AlertSlice";
import authentication from "../FirebaseServices/Authentication";
import { setUser } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";
import database from "../FirebaseServices/Database";

function Signup ()
{
  const [ firstName, setFirstName ] = useState ( "" );
  const [ lastName, setLastName ] = useState ( "" );
  const [ email, setEmail ] = useState ( "" );
  const [ password, setPassword ] = useState ( "" );
  const [ confirmPassword, setConfirmPassword ] = useState ( "" );

  const navigate = useNavigate ();
  const dispatch = useDispatch ();

  const signupErrorMap = {
    EMAIL_EXISTS: "This email is already registered.",
    OPERATION_NOT_ALLOWED: "Password sign‑in is disabled for this project.",
    TOO_MANY_ATTEMPTS_TRY_LATER: "Too many attempts. Please wait a bit and try again.",
    INVALID_EMAIL: "Please enter a valid email address.",
    WEAK_PASSWORD: "Password should be at least 6 characters.",
  };

  async function signupHandler ( e )
  {
    e.preventDefault ();

    // ---------- validation ----------

    if ( !firstName || !lastName || !email || !password || !confirmPassword )
    {
      dispatch (
        enqueueAlert (
          {
            type: "error",
            message: "Please complete all fields before submitting.",
          }
        )
      );
      return;
    }

    if ( password.length < 6 )
    {
      dispatch (
        enqueueAlert (
          {
            type: "error",
            message: "Password must be at least 6 characters long.",
          }
        )
      );
      return;
    }

    if ( password !== confirmPassword )
    {
      dispatch (
        enqueueAlert (
          {
            type: "error",
            message: "Password and Confirm Password do not match.",
          }
        )
      );
      return;
    }

    // ---------- API ----------

    const response = await authentication.signup ( email, password, `${firstName} ${lastName}` );

    if ( !response.status )
    {
      dispatch (
        enqueueAlert (
          {
            type: "error",
            message: signupErrorMap[response.message] || "Signup failed. Please try again.",
          }
        )
      );

      return;
    }

    // ---------- store & redirect ----------

    const { idToken, refreshToken, expiresIn, displayName, localId } = response.data;

    dispatch ( setUser ( { idToken, refreshToken, expiresIn, displayName, email, localId } ) );

    navigate ( "/landing-page" );

    dispatch (
      enqueueAlert (
        {
          type: "success",
          message: `Welcome aboard, ${firstName}!`,
        }
      )
    );

    // ---------- reset form ----------

    setFirstName ( "" );
    setLastName ( "" );
    setEmail ( "" );
    setPassword ( "" );
    setConfirmPassword ( "" );

    // ---------- creating user in the database ----------

    const user = await database.createUser ( localId );

    if ( !user.status )
    {
      dispatch (
        enqueueAlert (
          {
            type: "error",
            message: "Failed to create user. Please try again",
          }
        )
      );
      return;
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