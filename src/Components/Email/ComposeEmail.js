import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function ComposeEmail() {
  const [ editorState, setEditorState ] = useState ( EditorState.createEmpty () );
  const [ to, setTo ] = useState ( " ");
  const [ subject, setSubject ] = useState ( "" );

  const handleSendEmail = () => {
    const content = editorState.getCurrentContent().getPlainText();
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("Message:", content);

    // Add logic to send the email here
  };

  return (
    <div style={{ width: "50%", margin: "auto", marginTop: "2rem", padding: "2rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>Compose Email</h3>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="to" style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
          To:
        </label>
        <input
          id="to"
          type="email"
          placeholder="Enter recipient's email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "1rem",
          }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="subject" style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
          Subject:
        </label>
        <input
          id="subject"
          type="text"
          placeholder="Enter email subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "1rem",
          }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="editor" style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
          Message:
        </label>
        <div style={{ border: "1px solid #ccc", borderRadius: "4px", minHeight: "200px", padding: "1rem" }}>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            toolbar={{
              options: ["inline", "blockType", "fontSize", "list", "textAlign", "link", "history"],
            }}
          />
        </div>
      </div>

      <button
        onClick={handleSendEmail}
        style={{
          display: "block",
          width: "100%",
          padding: "0.75rem",
          backgroundColor: "#007bff",
          color: "white",
          fontSize: "1rem",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
}

export default ComposeEmail;