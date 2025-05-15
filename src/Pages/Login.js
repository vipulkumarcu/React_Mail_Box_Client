import { useState } from "react";
import { Button, FormWrapper, InputBox } from "../Components";
import { useDispatch } from "react-redux";
import { enqueueAlert } from "../Features/Slices/AlertSlice";

function Login ()
{
  const [ email, setEmail ] = useState ( "" );
  const [ password, setPassword ] = useState ( "" );

  const dispatch = useDispatch ();

  function loginHandler ( e )
  {
    e.preventDefault ();

    if ( !email || !password )
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

    const userData = { email, password };

    dispatch (
      enqueueAlert (
        {
          type: "success",
          message: "User Logged In Successfully",
        }
      )
    );

    console.log ( userData );

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