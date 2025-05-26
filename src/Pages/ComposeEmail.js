import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import database from "../AppwriteServices/Database";
import file from "../AppwriteServices/File";
import { hideLoader, showLoader } from "../Features/LoaderSlice";
import { addToSent } from "../Features/MailSlice";
import { showErrorMessage, showSuccessMessage } from "../Helpers/HelperAlertFunctions";
import { errorMessages, successMessages } from "../Helpers/HelperAlertMessages";
import { attachmentIcons } from "../Helpers/HelperIconVariables";
import { Paperclip, SendHorizonal, MailX, PlusCircle, MinusCircle, MailIcon, X } from "lucide-react";
import { EmailInput, InputBox, Button, TextEditor } from "../Components";

function ComposeEmail ()
{
  /* ───────────────────────── FORM STATES ───────────────────────── */
  const [ to, setTo ] = useState ( "" );
  const [ toName, setToName ] = useState ( "" );
  const [ cc, setCc ] = useState ( [] );
  const [ bcc, setBcc ] = useState ( [] );
  const [ subject, setSubject ] = useState ( "" );
  const [ emailMessage, setEmailMessage ] = useState ( "" );
  const [ attachments, setAttachments ] = useState ( [] );
  const [ showCcBcc, setShowCcBcc ] = useState ( false );

  /* ───────────────────────── USER DATA ───────────────────────── */
  const ownerId = localStorage.getItem ( "userId" );
  const senderName = localStorage.getItem ( "userName" );
  const senderEmail = localStorage.getItem ( "userEmail" );

  /* ───────────────────────── HOOKS ───────────────────────── */
  const navigate = useNavigate ();
  const dispatch = useDispatch ();

  /* ───────────────────────── ADD MULTIPLE ATTACHMENTS ───────────────────────── */
  function handleFileChange ( event )
  {
    const files = Array.from ( event.target.files );

    if ( !files.length ) return;

    setAttachments ( ( prev ) => [ ...prev, ...files ] );
    event.target.value = null;
  };

  /* ───────────────────────── SEND EMAIL ───────────────────────── */
  async function handleSend ( event )
  {
    event.preventDefault();

    /* ---------- 1. VALIDATION ---------- */

    if ( !to.trim () || !toName.trim () )
    {
      showErrorMessage ( dispatch, errorMessages.EMPTY_RECIPIENTS );
      return;
    }

    if ( !subject )
    {
      showErrorMessage ( dispatch, errorMessages.EMPTY_SUBJECT );
      return;
    }

    if ( !emailMessage )
    {
      showErrorMessage ( dispatch, errorMessages.EMPTY_MESSAGE );
      return;
    }

    /* ---------- 2. DISPLAY LOADER ---------- */

    dispatch ( showLoader () );

    try
    {
      /* ---------- 3. UPLOAD ATTACHMENTS ---------- */

      let uploadedAttachments = [];

      if ( attachments.length )
      {
        const uploadResponse = await file.uploadFiles ( attachments );

        if ( !uploadResponse.status )
        {
          showErrorMessage ( dispatch, uploadResponse.message );
          return;
        }

        uploadedAttachments = uploadResponse.data.map ( ( file ) => file.$id );
      }

      /* ---------- 4. SEND EMAIL AND REDIRECT ---------- */

      const { status, message, data } = await database.sendEmail (
        {
          ownerId: ownerId,
          subject: subject,
          body: emailMessage,
          timestamp: new Date ().toISOString (),
          attachments: uploadedAttachments,
          senderName: senderName,
          senderEmail: senderEmail,
          receiverName: toName,
          receiverEmail: to,
          cc: cc,
          bcc: bcc,
        }
      );

      if ( !status )
      {
        showErrorMessage ( dispatch, message );
        return;
      }

      navigate ( "/landing-page" );

      /* ---------- 5. SAVE TO REDUX ---------- */

      dispatch ( addToSent ( data ) );

      /* ---------- 6. UI FEEDBACK ---------- */
      showSuccessMessage ( dispatch, successMessages.EMAIL_SENT );

      /* ---------- 7. RESET FORM ---------- */
      setTo ( "" );
      setCc ( "" );
      setBcc ( "" );
      setSubject ( "" );
      setEmailMessage ( "" );
      setAttachments ( [] );
    }

    /* ---------- CATCHING ANY ERROR ---------- */

    catch ( error )
    {
      showErrorMessage (
        dispatch,
        errorMessages[ error.type?.toUpperCase () ]
          || error.message
          || errorMessages.DEFAULT
      );
    }

    /* ---------- HIDE LOADER ---------- */

    finally
    {
      dispatch ( hideLoader () );
    }
  };

  /* ───────────────────────── CONFIRM AND CANCEL ───────────────────────── */
  function handleCancel ()
  {
    const isConfirmed  = window.confirm ( "Are you sure you want to cancel ?" );
    if ( isConfirmed  ) navigate ( "/landing-page" );
  }

  /* ───────────────────────── JSX ───────────────────────── */
  return (
    <div className = "min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 p-6" >

      <div className = "max-w-7xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden" >

        <div className = "bg-indigo-500 text-white text-center py-5 shadow hover:bg-blue-400 pointer-events-none" >
          <h3 className = "text-4xl font-semibold flex justify-center items-center gap-3" >
            <MailIcon className = "w-10 h-10" />
            Compose Email
          </h3>
        </div>

        <form
          className = "bg-gradient-to-br from-indigo-200 to-purple-200 p-10 space-y-6"
          onSubmit = { handleSend }
        >

          <div className = "space-y-5" >

            <div>
              <InputBox
                label = "Name"
                placeholder = "Enter recipient's name"
                value = { toName }
                onChange = { ( e ) => setToName ( e.target.value ) }
              />
            </div>

            <div>
              <InputBox
                label = "Email"
                placeholder = "Enter recipient's email"
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
                    <EmailInput label="BCC" emails={bcc} setEmails={setBcc} />
                  </div>

                  <div>
                    <EmailInput label="CC" emails={cc} setEmails={setCc} />
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

            <TextEditor value = { emailMessage } onChange = { setEmailMessage } />


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
                      Send Email
                    </span>
                  }
                  type = "submit"
                  className = "px-6 py-3 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition"
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
                />
              </div>

            </div>

            {
              attachments.length > 0 &&
              (
                <div
                  className = "bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200 rounded-xl p-5 mt-6 shadow-lg"
                >

                  <h4
                    className = "text-base font-semibold text-indigo-800 tracking-wide mb-4 flex items-center gap-2"
                  >
                    <Paperclip className = "w-4 h-4 text-indigo-500" />
                    Attachments:
                    <span
                      className = "flex-shrink-0 grid place-items-center w-6 h-6 rounded-full bg-indigo-600  text-white transition"
                    >
                      { attachments.length }
                    </span>
                  </h4>

                  <div className = "flex flex-wrap gap-3" >

                    {
                      attachments.map (
                        ( file ) => {
                          const extension = file.name.split ( '.' ).pop ().toLowerCase ();
                          const Icon = attachmentIcons[ extension ] || attachmentIcons.default;
                          return (
                            <div
                              key = { file.name }
                              className = "group flex items-center gap-3 bg-white border border-indigo-200 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition"
                            >
                              <div>
                                <Icon className = "w-5 h-5 text-indigo-500 shrink-0" />
                              </div>

                              <div className = "min-w-0">
                                <p className = "text-sm text-indigo-800 font-medium truncate">
                                  { file.name }
                                </p>
                                <p className = "text-xs text-indigo-500">
                                  { ( file.size / 1024 ).toFixed ( 1 ) } KB • { file.type }
                                </p>
                              </div>

                              <button
                                type = "button"
                                title = "Remove"
                                onClick = {
                                  () => setAttachments ( ( prev ) => prev.filter ( ( f ) => f.name !== file.name ) )
                                }
                                className = "flex-shrink-0 grid place-items-center w-6 h-6 rounded-full bg-indigo-200 text-indigo-700 group-hover:bg-red-500 group-hover:text-white transition"
                              >
                                <X size = { 12 } strokeWidth = { 3 } />
                              </button>

                            </div>
                          );
                        }
                      )
                    }

                  </div>

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