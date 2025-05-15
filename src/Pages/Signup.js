import { useState } from "react";
import { Button, FormWrapper, InputBox } from "../Components";
import { useDispatch } from "react-redux";
import { enqueueAlert } from "../Features/Slices/AlertSlice";

function Signup ()
{
  const [ firstName, setFirstName ] = useState ( "" );
  const [ lastName, setLastName ] = useState ( "" );
  const [ email, setEmail ] = useState ( "" );
  const [ password, setPassword ] = useState ( "" );
  const [ confirmPassword, setConfirmPassword ] = useState ( "" );

  const dispatch = useDispatch ();

  function signupHandler ( e )
  {
    e.preventDefault ();

    if ( !firstName || !lastName || !email || !password || !confirmPassword )
    {
      dispatch (
        enqueueAlert (
          {
            type: "error",
            message: "Fill out the complete form",
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
            message: "Passwords do not match",
          }
        )
      );
      return;
    }

    // Collect User Data
    const userData = {
      firstName,
      lastName,
      email,
      password
    }

    dispatch (
      enqueueAlert (
        {
          type: "success",
          message: "User Created Successfully",
          duration: 1500
        }
      )
    );

    console.log ( userData );

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