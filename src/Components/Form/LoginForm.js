import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, FloatingLabel, Form, Alert } from 'react-bootstrap';
import { setAlert } from '../../Features/Slices/alertSlice';
import { Login } from '../../Features/Functions/Login';
import { DismissAlert } from '../../Features/Functions/DismissAlert';

function LoginForm ()
{
  const dispatch = useDispatch ();
  const navigate = useNavigate ();
  const alert = useSelector ( ( state ) => state.alert );

  const [ email, setEmail ] = useState ( "" );
  const [ password, setPassword ] = useState ( "" );

  async function submitHandler ( event )
  {
    event.preventDefault ();

    if ( !email || !password )
    {
      dispatch ( setAlert ( { message: "Please complete all fields before submitting.", type: "warning" } ) );
      DismissAlert ( dispatch );
      return;
    }

    const { success, message } = await dispatch ( Login ( email, password ) );

    if ( success )
    {
      setEmail ( "" );
      setPassword ( "" );

      dispatch ( setAlert ( { message: "Login successful!", type: "success" } ) );
      DismissAlert ( dispatch );

      navigate ( "/home-page" );
    }
    
    else
    {
      dispatch ( setAlert ( { message: message || "Login failed.", type: "warning" } ) );
      DismissAlert ( dispatch );
    }

  };

  return (
      <div className = "d-flex justify-content-center align-items-center vh-100 bg-success bg-gradient" >
  
        <Card style = { { width: '400px' } } >
  
          <Card.Header className = "text-center" >
            <h4> Login </h4>
          </Card.Header>
  
          <Card.Body>
  
            {
              alert.message && <Alert variant = { alert.type } > { alert.message } </Alert>
            }
  
            <Form onSubmit = { submitHandler } >
  
              <FloatingLabel label = "Email Address" className = "mb-3">
                <Form.Control
                  type = "email"
                  placeholder = "Enter Email"
                  value = {email}
                  onChange = { ( e ) => setEmail ( e.target.value ) }
                />
              </FloatingLabel>
  
              <FloatingLabel label = "Enter Password" className = "mb-3" >
                <Form.Control
                  type = "password"
                  placeholder = "Password"
                  value = { password }
                  onChange = { ( e ) => setPassword ( e.target.value ) }
                />
              </FloatingLabel>
  
              <Button type = "submit" className = "w-100" variant = "success" >
                Login
              </Button>
  
            </Form>
  
            <div className = "text-center mt-3" >
              Don't have an account? { " " }
              <Link to = "/signup" style = { { textDecoration: "none" } } >
                Signup
              </Link>
            </div>
  
          </Card.Body>
  
        </Card>
  
      </div>
    );
}

export default LoginForm;