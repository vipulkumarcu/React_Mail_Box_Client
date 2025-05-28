import { useState } from "react";
import { useAuthenticate } from "../Hooks/useAuthenticate";
import { Button, FormWrapper, InputBox } from "../Components";

function Login ()
{
  /* ───────────────────────── FORM STATES ───────────────────────── */
  const [ email, setEmail ] = useState ( "" );
  const [ password, setPassword ] = useState ( "" );

  /* ───────────────────────── HOOKS ───────────────────────── */
  const { login } = useAuthenticate ();

  /* ───────────────────────── LOGIN HANDLER ───────────────────────── */
  async function loginHandler ( event )
  {
    event.preventDefault ();

    const isSuccess = await login ( { email, password } );

    if ( !isSuccess )
    {
      // Reset form only if successful
      setEmail ( "" );
      setPassword ( "" );
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