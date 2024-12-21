import { EditorState } from "draft-js";
import { useState } from "react";
<<<<<<< HEAD
import { Button, Card, FloatingLabel, Form, Collapse, Alert } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // For icons
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from '../../Features/Slices/alertSlice';
import { SendEmail } from '../../Features/Functions/SendEmail';
import { DismissAlert } from '../../Features/Functions/DismissAlert';
import { useNavigate } from "react-router-dom";

function CreateEmail ()
{
  const navigate = useNavigate ();
  const dispatch = useDispatch ();
  const alert = useSelector ( ( state ) => state.alert );

  const [ to, setTo ] = useState ( "" );
  const [ cc, setCc ] = useState ( "" );
  const [ bcc, setBcc ] = useState( "" );
  const [ subject, setSubject ] = useState ( "" );
  const [ showCc, setShowCc ] = useState ( false );
  const [ showBcc, setShowBcc ] = useState ( false );
  const [ editorState, setEditorState ] = useState ( EditorState.createEmpty () );

  async function emailHandler ( event )
  {
    event.preventDefault ();

    if ( !to || !subject )
    {
      dispatch ( setAlert ( { message: "Recipient and Subject are required.", type: "warning" } ) );
      DismissAlert ( dispatch );
      return;
    }

    const content = editorState.getCurrentContent().getPlainText();

    const emailData = { to, cc, bcc, subject, content, };

    const { success, message } = await dispatch ( SendEmail ( emailData ) );

    if ( success )
    {
      dispatch ( setAlert ( { message: "Email sent successfully!", type: "success" } ) );
      // Reset fields
      setTo ( "" );
      setCc ( "" );
      setBcc ( "" );
      setSubject ( "" );
      setEditorState ( EditorState.createEmpty () );
    }
    
    else
    {
      dispatch ( setAlert ( { message: message || "Failed to send email.", type: "danger" } ) );
    }

    DismissAlert ( dispatch );
  }


  return (
    <div
      style = {
        {
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#268E5E",
        }
      }
    >

      <Card
        className = "shadow-lg"
        style = {
          {
          width: "90rem",
          borderRadius: "12px",
          }
        }
      >

        <Card.Header
          as = "h5"
          className = "text-center bg-primary text-white p-3"
          style = {
            {
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }
          }
        >
          Compose Email          
        </Card.Header>

        {alert.message && <Alert variant = { alert.type } > { alert.message } </Alert>}

        <Form onSubmit = { emailHandler } className = "p-4" >
          {/* To Field */}
          <FloatingLabel controlId = "to" label = "To" className = "mb-3" >
=======
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function CreateEmail ()
{
  const [ to, setTo ] = useState ( "" );
  const [ subject, setSubject ] = useState ( "" );
  const [ editorState, setEditorState ] = useState ( EditorState.createEmpty () );

  function emailHandler ( event )
  {
    event.preventDefault ();
    const content = editorState.getCurrentContent().getPlainText();
    const emailData = {
      to,
      subject,
      content
    };
    console.log ( "Data", emailData );
    setTo ( "" );
    setSubject ( "" );
    setEditorState ( "" );
  }

  return (
    <div style = { { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" } }>

      <Card className = "shadow" style = { { height: "90vh", width: "90rem", padding: '2rem' } } >

        <Form onSubmit = { emailHandler } >

          <FloatingLabel
            controlId = "to"
            label = "To"
            className = "mb-3"
          >
>>>>>>> 5785655643ce0befb31d0016ff19c262c75c7975
            <Form.Control
              type = "email"
              placeholder = "To"
              value = { to }
              onChange = { ( e ) => setTo ( e.target.value ) }
            />
          </FloatingLabel>

<<<<<<< HEAD
          {/* CC and BCC Toggles */}
          <div className = "mb-2 d-flex justify-content-start" >

            <Button
              variant = "link"
              className = "p-0 me-3"
              onClick = { () => setShowCc ( !showCc ) }
            >
              { showCc ? "Hide CC" : "Add CC" }
            </Button>

            <Button
              variant = "link"
              className = "p-0"
              onClick = { () => setShowBcc ( !showBcc ) }
            >
              { showBcc ? "Hide BCC" : "Add BCC" }
            </Button>

          </div>

          {/* CC Field */}
          <Collapse in = { showCc } >
            <div>
              <FloatingLabel controlId = "cc" label = "CC" className = "mb-3" >
                <Form.Control
                  type = "email"
                  placeholder = "CC"
                  value = { cc }
                  onChange = { ( e ) => setCc ( e.target.value ) }
                />
              </FloatingLabel>
            </div>
          </Collapse>

          {/* BCC Field */}
          <Collapse in = { showBcc } >
            <div>
              <FloatingLabel controlId = "bcc" label = "BCC" className = "mb-3" >
                <Form.Control
                  type = "email"
                  placeholder = "BCC"
                  value = { bcc }
                  onChange = { ( e ) => setBcc ( e.target.value ) }
                />
              </FloatingLabel>
            </div>
          </Collapse>

          {/* Subject Field */}
          <FloatingLabel controlId = "subject" label = "Subject" className = "mb-3" >
=======
          <FloatingLabel
            controlId = "subject"
            label = "Subject"
            className = "mb-3"
          >
>>>>>>> 5785655643ce0befb31d0016ff19c262c75c7975
            <Form.Control
              type = "text"
              placeholder = "Subject"
              value = { subject }
              onChange = { ( e ) => setSubject ( e.target.value ) }
            />
          </FloatingLabel>

<<<<<<< HEAD
          {/* Email Body Editor */}
          <div
            className = "editor-container mb-3 border rounded"
            style = { { height: "40vh" } }
          >
            <Editor
              editorState = { editorState }
              onEditorStateChange = { setEditorState }
              toolbar = {
                {
                  options: [ "inline", "blockType", "fontSize", "list", "link", "history" ],
                }
              }
              wrapperClassName = "editor-wrapper"
              editorClassName = "editor p-2" // Added padding here
              toolbarClassName = "editor-toolbar"
            />
          </div>

          {/* Toolbar with Functional Buttons */}
          <Card.Footer className = "bg-light d-flex justify-content-between align-items-center" >
            {/* Action Buttons */}
            <div>

              <Button type = "submit" variant = "success" className = "me-2">
                <i className = "bi bi-send"> </i> Send
              </Button>

              <Button variant = "warning" className = "me-2">
                <i className = "bi bi-file-earmark-text"> </i> Save as Draft
              </Button>

              <Button variant = "danger" onClick = { () => navigate ( "/home-page" ) } >
                <i className = "bi bi-trash"> </i> Cancel
              </Button>

            </div>

            {/* Toolbar Buttons */}
            <div>

              <Button variant = "outline-secondary" className = "me-2">
                <i className = "bi bi-paperclip"></i>
              </Button>

              <Button variant = "outline-secondary" className = "me-2">
                <i className = "bi bi-link"> </i>
              </Button>

              <Button variant = "outline-secondary" className = "me-2">
                <i className = "bi bi-emoji-smile"> </i>
              </Button>

              <Button variant = "outline-secondary">
                <i className = "bi bi-file-image"> </i>
              </Button>

            </div>

          </Card.Footer>
=======
          <div style = { { height: "60vh", width: "86rem", border: "1px solid #E4E4E4", borderRadius: "6px" } } className = "editor-container mb-3" >
            <label className = "form-label mx-3 my-3"> Mail </label>
            <div style = { { padding: "1rem" } } >
              <Editor
                editorState = { editorState }
                onEditorStateChange = { setEditorState }
                toolbar = {
                  {
                    options: [ "inline", "blockType", "fontSize", "list", "textAlign", "link", "history" ],
                  }
                }
                wrapperClassName = "editor-wrapper"
                editorClassName = "editor"
                toolbarClassName = "editor-toolbar"
                style = { { minHeight: "70vh" } } 
              />
            </div>
          </div>

          <Button
            type = "submit"
            variant = "primary"
            className = "shadow my-3 me-3 p-2"
            style = { { fontSize: "1.2rem" } }
            aria-label = "Send"
          > 
            Send
          </Button>

          <Button
            type = "submit"
            variant = "danger"
            className = "shadow my-3 p-2"
            style = { { fontSize: "1.2rem" } }
            aria-label = "Cancel"
          > 
            Cancel
          </Button>
>>>>>>> 5785655643ce0befb31d0016ff19c262c75c7975

        </Form>

      </Card>

    </div>
<<<<<<< HEAD
  );
}

export default CreateEmail;
=======
  )
}

export default CreateEmail;
>>>>>>> 5785655643ce0befb31d0016ff19c262c75c7975
