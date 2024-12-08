import { useState } from "react";
import { Button, Card, Container, FloatingLabel, Form } from "react-bootstrap";

function SignupForm ()
{
  const [ email, setEmail ] = useState ( "" );
  const [ password, setPassword ] = useState ( "" );
  const [ confirmPassword, setConfirmPassword ] = useState ( "" );

  async function signupHandler ( event )
  {
    event.preventDefault ();

    if ( !email || !password || !confirmPassword )
    {
      alert ( "Please complete all fields before submitting." );
      return;
    }

    if ( password !== confirmPassword )
    {
      alert ( "Passwords do not match." );
      return;
    }

    try
    {
      const response = await fetch ("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAoB-HcUHT0yEXCiHtMI9ubVuSNv34MYZI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify (
            {
              email,
              password,
              returnSecureToken: true,
            }
          ),
        }
      );

      if ( !response.ok )
      {
        const errorData = await response.json ();
        throw new Error ( errorData.error.message || "Signup failed." );
      }

      alert ( "Signup Successful" );
    }
    
    catch ( error )
    {
      alert ( error.message );
    }

    setEmail ( "" );
    setPassword ( "" );
    setConfirmPassword ( "" );
  }

  return (
    <Container
      className = "d-flex justify-content-center align-items-center"
      style = { { minHeight: "100vh" } }
    >

      <Card
        className = "shadow mx-auto"
        style = { { width: "100%", maxWidth: "400px" } }
      >

        <Card.Header
          className = "p-4 text-center"
          as = "h3"
        >
          Sign Up
        </Card.Header>

        <Card.Body>

            <Form onSubmit = { signupHandler } >

              <FloatingLabel
                controlId = "email"
                label = "Enter Email"
                className = "mb-3"
              >
                <Form.Control
                  type = "email"
                  placeholder = "Enter Email"
                  value = { email }
                  onChange = { ( e ) => setEmail ( e.target.value ) }
                />
              </FloatingLabel>

              <FloatingLabel
                controlId = "password"
                label = "Enter Password"
                className = "mb-3"
              >
                <Form.Control
                  type = "password"
                  placeholder = "Enter Password"
                  value = { password }
                  onChange = { ( e ) => setPassword ( e.target.value ) }
                />
              </FloatingLabel>

              <FloatingLabel
                controlId = "confirmPassword"
                label = "Confirm Password"
                className = "mb-3"
              >
                <Form.Control
                  type = "password"
                  placeholder = "Confirm Password"
                  value = { confirmPassword } onChange = { ( e ) => setConfirmPassword ( e.target.value ) }
                />
              </FloatingLabel>

              <Button
                type = "submit"
                variant = "primary"
                className = "shadow w-100 my-3 rounded-pill p-2"
                style = { { fontSize: "1.2rem" } }
                aria-label="Sign Up"
              > 
                Sign Up
              </Button>

            </Form>

        </Card.Body>

        <Card.Footer className = "text-center">
          <Button
            className = "shadow w-100 my-3 p-3"
            style = { { fontSize: "1.2rem" } } 
            variant = "success"
            aria-label="Login"
          > 
            Have an Account ? Login 
          </Button>
        </Card.Footer>

      </Card>

    </Container>
  )
}

export default SignupForm;