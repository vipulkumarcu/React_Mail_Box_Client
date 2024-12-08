import { useState } from "react";
import { Button, Card, Container, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LoginForm ()
{
  const [ email, setEmail ] = useState ( "" );
  const [ password, setPassword ] = useState ( "" );

  const navigate = useNavigate ();

  async function loginHandler ( event )
  {
    event.preventDefault ();

    if ( !email || !password )
    {
      alert ( "Please complete all fields before submitting." );
      return;
    }

    const loginData = {
      Email: email,
      Password: password,
    }

    console.log ( "Data of the user logging in :", loginData );

    try
    {
      const response = await fetch ( "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAoB-HcUHT0yEXCiHtMI9ubVuSNv34MYZI",
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
        throw new Error ( errorData.error.message || "Login failed." );
      }

      alert ( "Login Successful" );

      navigate ( "/landing-page" );

      const data = await response.json ();

      localStorage.setItem ( "Login Token", data.idToken );
    }
    
    catch ( error )
    {
      alert ( error.message );
    }

    setEmail ( "" );
    setPassword ( "" );
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
          Login
        </Card.Header>

        <Card.Body className = "text-center">

            <Form onSubmit = { loginHandler } >

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

              <Button
                type = "submit"
                variant = "primary"
                className = "shadow w-100 my-3 rounded-pill p-2"
                style = { { fontSize: "1.2rem" } }
                aria-label="Login"
              > 
                Login
              </Button>

            </Form>

            <Button
              className = "m-2"
              variant = "link"
              style = { { fontSize: "1.1rem" } } 
              aria-label="Sign Up"
            > 
              Forgot Password ?
            </Button>

        </Card.Body>

        <Card.Footer className = "text-center">
          <Button
            className = "shadow w-100 my-3 p-3"
            style = { { fontSize: "1.2rem" } } 
            variant = "success"
            aria-label="Sign Up"
            onClick = { () => navigate ( "/" ) }
          > 
            Don't Have an Account ? Signup 
          </Button>
        </Card.Footer>

      </Card>

    </Container>
  )
}

export default LoginForm;