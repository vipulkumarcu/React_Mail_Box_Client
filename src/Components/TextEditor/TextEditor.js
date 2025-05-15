import { Editor } from "@tinymce/tinymce-react";
import environmentVariables from "../../EnvironmentVariables/EnvironmentVariables";

const { tinyMceApiKey } = environmentVariables;

function TextEditor ( { value, onChange } )
{
  return (
    <div>
      <label className = "block text-indigo-600 font-medium mb-1" > Message </label>
      <Editor
        apiKey = { tinyMceApiKey }
        value = { value }
        onEditorChange = { onChange }
        init = {
          {
            height: 350,
            menubar: false,
            plugins: [
              "advlist", "autolink", "lists", "link", "image", "charmap",
              "preview", "anchor", "searchreplace", "visualblocks", "code",
              "fullscreen", "insertdatetime", "media", "table", "help", "wordcount"
            ],
            toolbar:
              "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | fullscreen",
            content_style:
              "body { font-family:Inter,sans-serif; font-size:14px; color:#334155; }",
          }
        }
      />
    </div>
  );
}

export default TextEditor;