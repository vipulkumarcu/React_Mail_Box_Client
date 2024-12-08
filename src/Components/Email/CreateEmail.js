import { EditorState } from "draft-js";
import { useState } from "react";
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
            <Form.Control
              type = "email"
              placeholder = "To"
              value = { to }
              onChange = { ( e ) => setTo ( e.target.value ) }
            />
          </FloatingLabel>

          <FloatingLabel
            controlId = "subject"
            label = "Subject"
            className = "mb-3"
          >
            <Form.Control
              type = "text"
              placeholder = "Subject"
              value = { subject }
              onChange = { ( e ) => setSubject ( e.target.value ) }
            />
          </FloatingLabel>

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

        </Form>

      </Card>

    </div>
  )
}

export default CreateEmail;
