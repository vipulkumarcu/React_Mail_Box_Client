import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, FloatingLabel, Form, Alert } from 'react-bootstrap';
import { setAlert } from '../../Features/Slices/alertSlice';
import { Signup } from '../../Features/Functions/Signup';
import { DismissAlert } from '../../Features/Functions/DismissAlert';


function SignupForm ()
{
  const dispatch = useDispatch ();
  const alert = useSelector ( ( state ) => state.alert );

  const [ email, setEmail ] = useState ( "" );
  const [ password, setPassword ] = useState ( "" );
  const [ confirmPassword, setConfirmPassword ] = useState ( "" );

  async function submitHandler ( event )
  {
    event.preventDefault ();

    if ( !email || !password || !confirmPassword )
    {
      dispatch ( setAlert ( { message: "Please complete all fields before submitting.", type: "warning" } ) );
      DismissAlert ( dispatch );
      return;
    }

    if ( password !== confirmPassword )
    {
      dispatch ( setAlert ( { message: "Passwords do not match.", type: "warning" } ) );
      DismissAlert ( dispatch );
      return;
    }

    const { success, message } = await dispatch ( Signup ( email, password ) );

    if ( success )
    {
      dispatch ( setAlert ( { message: "Signup successful. Please log in.", type: "success" } ) );
      DismissAlert ( dispatch );
      
      setEmail ( "" );
      setPassword ( "" );
      setConfirmPassword ( "" );
    }
    
    else
    {
      dispatch ( setAlert ( { message: message || "Signup failed.", type: "danger" } ) );
      DismissAlert ( dispatch );
    }
  };

  return (
    <div className = "d-flex justify-content-center align-items-center vh-100 bg-success bg-gradient" >

      <Card style = { { width: '400px' } } >

        <Card.Header className = "text-center" >
          <h4> Sign Up </h4>
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

            <FloatingLabel label = "Confirm Password" className = "mb-3" >
              <Form.Control
                type = "password"
                placeholder = "Confirm Password"
                value = { confirmPassword }
                onChange = { ( e ) => setConfirmPassword ( e.target.value ) }
              />
            </FloatingLabel>

            <Button type = "submit" className = "w-100" variant = "success" >
              Sign Up
            </Button>

          </Form>

          <div className = "text-center mt-3" >
            Already have an account? { " " }
            <Link to = "/login" style = { { textDecoration: "none" } } >
              Login
            </Link>
          </div>

        </Card.Body>

      </Card>

    </div>
  );
}

export default SignupForm;