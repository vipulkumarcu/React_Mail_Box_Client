import { useState } from "react";
import { Button, FormWrapper, InputBox } from "../Components";
import { useDispatch } from "react-redux";
import { enqueueAlert } from "../Features/Slices/AlertSlice";
import authentication from "../FirebaseServices/Authentication";
import { setUser } from "../Features/Slices/UserSlice";
import { useNavigate } from "react-router-dom";

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

    if ( password.length < 8 )
    {
      dispatch (
        enqueueAlert (
          {
            type: "error",
            message: "Password must be at least 8 characters long.",
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

    const response = await authentication.signup ( email, password, `${firstName} ${lastName}` );

    if ( !response.status )
    {
      dispatch (
        enqueueAlert (
          {
            type: "error",
            message: response.message || "Signup failed. Please try again.",
          }
        )
      );
      return;
    }

    const { idToken, refreshToken, expiresIn, displayName } = response.data;

    dispatch (
      setUser (
        {
          idToken,
          refreshToken,
          expiresIn,
          displayName,
          email,
        }
      )
    );

    navigate ( "/landing-page" );

    dispatch (
      enqueueAlert (
        {
          type: "success",
          message: "Account created successfully! You're now logged in.",
        }
      )
    );

    // Clear Form
    setFirstName ( "" );
    setLastName ( "" );
    setEmail ( "" );
    setPassword ( "" );
    setConfirmPassword ( "" );
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