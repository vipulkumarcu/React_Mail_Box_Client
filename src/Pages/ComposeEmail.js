import { useState } from "react";
import { InputBox, Button, TextEditor } from "../Components";
import { Paperclip, SendHorizonal, MailX, PlusCircle, MinusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { enqueueAlert } from "../Features/AlertSlice";


function ComposeEmail() {
  const [ to, setTo ] = useState ( "" );
  const [ cc, setCc ] = useState ( "" );
  const [ bcc, setBcc ] = useState ( "" );
  const [ subject, setSubject ] = useState ( "" );
  const [ message, setMessage ] = useState ( "" );
  const [ attachments, setAttachments ] = useState ( [] );
  const [ showCcBcc, setShowCcBcc ] = useState ( false );
  const [ isSending, setIsSending ] = useState ( false );

  const navigate = useNavigate ();
  const dispatch = useDispatch ();

  function handleFileChange ( e )
  {
    setAttachments ( [ ...e.target.files ] );
    e.target.value = null;
  };

  function handleSend ( event )
  {
    event.preventDefault();

    if ( !to.trim () )
    {
      dispatch ( enqueueAlert ( { type: "error", message: "Please enter a recipient" } ) );
      return;
    }

    if ( !subject )
    {
      dispatch ( enqueueAlert ( { type: "error", message: "Please enter subject" } ) );
      return;
    }

    if ( !message )
    {
      dispatch ( enqueueAlert ( { type: "error", message: "Please enter your mail" } ) );
      return;
    }

    const emailData = {
      to,
      cc,
      bcc,
      subject,
      message,
      attachments,
    };

    console.log ( emailData );

    setIsSending ( true );

    setTimeout (
      () => {
    // Clear fields after sending
      setTo ( "" );
      setCc ( "" );
      setBcc ( "" );
      setSubject ( "" );
      setMessage ( "" );
      setAttachments ( [] );
      setIsSending(false);
      }, 1000
    );
  };

  function handleCancel ()
  {
    const isConfirmed  = window.confirm ( "Are you sure you want to cancel ?" );
    if ( isConfirmed  ) navigate ( "/landing-page" );
  }

  return (
    <div className = "min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 p-6" >

      <div className = "max-w-7xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden" >

        <div className = "bg-indigo-500 text-white text-center py-5 shadow hover:bg-blue-400 pointer-events-none" >
          <h3 className = "text-4xl font-semibold" > 📨 Compose Email </h3>
        </div>

        <form
          className = "bg-gradient-to-br from-indigo-200 to-purple-200 p-10 space-y-6"
          onSubmit = { handleSend }
        >

          <div className = "space-y-5" >

            <div>
              <InputBox
                label = "To"
                placeholder = "Enter recipient email"
                value = { to }
                onChange = { ( e ) => setTo ( e.target.value ) }
              />
            </div>

            <div>
              <Button
                onClick = { () => setShowCcBcc ( !showCcBcc ) }
                className = "inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
                buttonText = {
                  <span className = "flex items-center gap-2" >
                    {
                      showCcBcc
                      ? (
                        <>
                          <MinusCircle className = "w-5 h-5" />
                          Hide CC/BCC
                        </>
                      )
                      : (
                        <>
                          <PlusCircle className = "w-5 h-5" />
                          Add CC/BCC
                        </>
                      )
                    }
                  </span>
                }
              />
            </div>

            {
              showCcBcc &&
              (
                <div className = "grid grid-cols-1 md:grid-cols-2 gap-4" >
                  <div>
                    <InputBox
                      label = "CC"
                      placeholder = "Enter CC emails"
                      value = { cc }
                      onChange = { ( e ) => setCc ( e.target.value ) }
                    />
                  </div>

                  <div>
                    <InputBox
                      label = "BCC"
                      placeholder = "Enter BCC emails"
                      value = { bcc }
                      onChange = { ( e ) => setBcc ( e.target.value ) }
                    />
                  </div>
                </div>
              )
            }

            <div>
              <InputBox
                label = "Subject"
                placeholder = "Enter subject"
                value = { subject }
                onChange = { ( e ) => setSubject ( e.target.value ) }
              />
            </div>

            <TextEditor value = { message } onChange = { setMessage } />


            {/* Footer Items - Attach, Cancel, Send Buttons */}
            <div className = "flex items-center justify-between mt-4" >

              <label
                htmlFor = "file-upload"
                className = "flex items-center space-x-2 cursor-pointer text-indigo-700 hover:text-indigo-900 transition"
              >
                <Paperclip className = "w-5 h-5" />
                <span className = "font-medium" > Attach files </span>
                <input
                  id = "file-upload"
                  type = "file"
                  multiple
                  onChange = { handleFileChange }
                  className = "hidden"
                />
              </label>

              <div className = "flex gap-3" >
                <Button
                  buttonText = {
                    <span className = "flex items-center gap-2 font-semibold tracking-wide" >
                      <SendHorizonal className = "w-5 h-5" />
                      { isSending ? "Sending..." : "Send Email" }
                    </span>
                  }
                  type = "submit"
                  className = "px-6 py-3 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition"
                  disabled = { isSending }
                />

                <Button
                  buttonText = {
                    <span className = "flex items-center gap-2 font-semibold tracking-wide" >
                      <MailX className = "w-5 h-5" />
                      Discard
                    </span>
                  }
                  onClick = { handleCancel }
                  className = "px-6 py-3 rounded-md bg-gradient-to-r from-red-400 to-red-800 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition"
                  disabled = { isSending }
                />
              </div>

            </div>

            {
              attachments.length > 0 &&
              (
                <div className = "bg-indigo-50 rounded-md p-3 text-sm text-indigo-700" >
                  <strong> Attachments: </strong> {" "}
                  { attachments.map ( ( file ) => file.name ).join ( ", " )  }
                </div>
              )
            }
          </div>

        </form>

      </div>

    </div>
  );
}

export default ComposeEmail;