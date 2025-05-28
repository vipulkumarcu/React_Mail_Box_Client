import { useEffect, useState } from "react";
import { MailOpen, Clock, Paperclip, Download, ArrowBigLeft, Shredder, AtSign, User, } from "lucide-react";
import { formatDate } from "../Helpers/HelperTableFunctions";
import { attachmentIcons } from "../Helpers/HelperIconVariables";
import { Button } from "../Components";
import { mailViewed, addToTrash, selectEmailById, removeFromTrash } from "../Features/MailSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorMessage, showSuccessMessage } from "../Helpers/HelperAlertFunctions";
import { errorMessages } from "../Helpers/HelperAlertMessages";
import database from "../AppwriteServices/Database";

export default function EmailView ()
{
  /* ───────────────────────────── STATE ────────────────────────────── */
  const [ fadeIn, setFadeIn ] = useState ( false );

  /* ───────────────────────────── HOOKS ────────────────────────────── */
  const { folder, id } = useParams ();
  const navigate = useNavigate ();
  const dispatch = useDispatch ();

  const email = useSelector ( ( state ) => selectEmailById ( state, id ) );

  /* ───────────────────────── ANIMATION DELAY ───────────────────────── */
  useEffect (
    () => {
      const timeout = setTimeout ( () => setFadeIn ( true ), 50 );

      return () => clearTimeout ( timeout );
    }, []
  );

  /* ──────────────────────── MARK-AS-READ EFFECT ─────────────────────── */
  useEffect (
    () => {
      if ( !email || email.isRead || folder !== "Inbox" ) return;

      (
        async () => {
          try
          {
            const response = await database.markAsRead ( id );

            dispatch ( mailViewed ( { $id: id, folder } ) );        // Currently because API is not being used

            if ( !response.status ) {
              showErrorMessage ( dispatch, response.message );
              return;
            }

            // dispatch ( mailViewed ( { $id: id, folder } ) );
          }

          catch ( error )
          {
            showErrorMessage (
              dispatch,
              errorMessages[ error.type?.toUpperCase () ]
                || error.message
                || errorMessages.DEFAULT
            );
          }
        }
      )

      ();
    }, [ email, id, folder, dispatch ]
  );

  /* ───────────────────────── NOT-FOUND HANDLING ─────────────────────── */
  if ( !email )
  {
    showErrorMessage ( dispatch, errorMessages.MAIL_NOT_FOUND );
    navigate ( -1 );
    return null;
  }

  /* ───────────────────────── ADD-TO-TRASH HANDLER ───────────────────── */
  async function addToTrashHandler ( event, email )
  {
    event.stopPropagation ();

    try
    {
      const response = await database.moveToTrash ( email.$id );

      dispatch ( addToTrash ( { ...email, folder } ) );               // Currently because API is not being used
      navigate ( -1 );

      if ( !response.status )
      {
        showErrorMessage ( dispatch, response.message );
        return;
      }

      // dispatch ( addToTrash ( { ...email, folder } ) );
      // navigate ( -1 );
      showSuccessMessage ( dispatch, response.message );
    }

    catch ( error )
    {
      showErrorMessage (
        dispatch,
        errorMessages[ error.type?.toUpperCase() ] || error.message || errorMessages.DEFAULT
      );
    }
  }

  /* ───────────────────────── PERMANENT DELETE ──────────────────────── */
  async function removeFromTrashHandler ( event, id )
  {
    event.stopPropagation ();
    try
    {
      const response = await database.deleteEmail ( id );

      dispatch ( removeFromTrash ( id ) );                        // Currently because API is not being used
      navigate ( -1 );

      if ( !response.status )
      {
        showErrorMessage ( dispatch, response.message );
        return;
      }

      // dispatch ( removeFromTrash ( id ) );
      // navigate ( -1 );
      showSuccessMessage ( dispatch, response.message );
    }

    catch ( error )
    {
      showErrorMessage ( dispatch, error.message || errorMessages.DEFAULT );
    }
  }

  /* ───────────────────────────── JSX ───────────────────────────── */
  return (
    <div className = "min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 p-6" >

      <div
        className = {`relative rounded-2xl shadow-xl bg-gradient-to-br from-indigo-200 to-purple-200
          overflow-hidden transform transition-all duration-500 ${ fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]" }`
        }
      >
        <span className = "absolute inset-x-0 top-0 h-1 bg-indigo-500" />

        {/* -------------- HEADER -------------- */}
        <div className = "flex items-center mb-5 justify-between px-8 pt-8" >

            <Button
              className = "group p-2 rounded-xl bg-indigo-100 hover:bg-indigo-500 shadow-md hover:shadow-lg transition"
              buttonText = {
                <div className = "flex items-center gap-2 text-indigo-700 group-hover:text-white transition-colors" >
                  <ArrowBigLeft className = "w-5 h-5" size = { 22 } />
                  <span > Back to { folder } </span>
                </div>
              }
              onClick = { () => navigate ( "/landing-page" ) }
            />

            <h1 className = "text-3xl font-bold text-indigo-800 tracking-tight flex items-center gap-2" >
              <MailOpen className = "w-6 h-6 text-indigo-500" />
              { email.subject }
            </h1>

            <Button
              className = "p-2 rounded-xl bg-red-100 hover:bg-red-200 shadow-md hover:shadow-lg transition"
              buttonText = {
                <Shredder className = "w-5 h-5 text-red-600" size = { 22 } />
              }
              onClick = {
                ( event ) => {
                  if ( folder === "Trash" ) removeFromTrashHandler ( event, email.$id );
                  else addToTrashHandler ( event, email );
                }
              }
            />

        </div>

        {/* -------------- META -------------- */}
        <div className = "px-20 py-10 space-y-6" >

          <div className = "grid sm:grid-cols-3 gap-4 font-medium text-lg text-gray-600" >

            <div className = "flex items-center gap-2" >
              <AtSign className = "w-6 h-6 text-indigo-500" />
              <span className = "underline font-medium" > { email.senderEmail } </span>
            </div>

            <div className = "flex items-center gap-2" >
              <User className = "w-6 h-6 text-indigo-500" />
              <span> { email.receiverEmail } </span>
            </div>

            <div className = "flex items-center gap-2" >
              <Clock className = "w-6 h-6 text-indigo-500" />
              <span> { formatDate ( email.timestamp, "full" ) } </span>
            </div>

          </div>

          {/* -------------- BODY -------------- */}
          <article
            className = "prose prose-indigo max-w-none text-md text-gray-700"
            dangerouslySetInnerHTML = { { __html: email.body } }
          />

          {/* -------------- ATTACHMENTS -------------- */}
          <section>

            <h3
              className = "flex items-center gap-4 text-indigo-900 font-bold text-md mb-5 tracking-wider uppercase"
            >
              <Paperclip className = "w-5 h-5 text-indigo-700" /> Attachments
            </h3>

            <div className = "grid sm:grid-cols-2 lg:grid-cols-5 gap-5" >
              {
                email.attachments.map (
                  ( file ) => {
                  const extension = file.name.split ( '.' ).pop ().toLowerCase ();
                  const Icon = attachmentIcons[ extension ] || attachmentIcons.default;
                  return (
                    <div
                      key = { file.name }
                      className = "bg-gradient-to-r from-indigo-100 to-purple-100 backdrop-blur-md rounded-2xl shadow-xl p-3 flex gap-5 items-start border border-indigo-400/30 transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]"
                    >

                      <Icon className = "w-6 h-6 text-indigo-700 flex-shrink-0 mt-1" />

                      <div className = "flex-1" >

                        <p className = "text-sm font-medium text-gray-900" > { file.name } </p>

                        <p className = "text-sm text-gray-700 mb-5" > { ( file.size / 1024 ).toFixed ( 1 ) } KB </p>

                        <a
                          href = { file.url }
                          download
                          className = "inline-flex items-center gap-3 text-base font-normal px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:shadow-xl hover:scale-105"
                        >
                          <Download className = "w-6 h-6" />
                          Download
                        </a>

                      </div>

                    </div>
                  );
                })
              }
            </div>

          </section>

        </div>

      </div>

    </div>
  );
}