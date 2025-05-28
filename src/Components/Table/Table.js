import { headingIconMap } from "../../Helpers/HelperIconVariables";
import { formatDate, getDisplayContact, tableHeadings } from "../../Helpers/HelperTableFunctions";
import { MailOpen, Shredder, Mail, Trash, ArchiveRestore } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEmails } from "../../Hooks/useEmails";

function Table ( { emails, folder } )
{
  /* ---------- HOOK ---------- */
  const navigate = useNavigate ();
  const { moveToTrash, restoreFromTrash, deleteFromTrash } = useEmails ();

  /* ---------- HEADINGS ---------- */
  const headings = tableHeadings ( folder );

  /* ---------- GRID TEMPLATE ---------- */
  const isTrash = folder === "Trash";

  const gridTemplate = isTrash
    ? "grid-cols-[70px_160px_3fr_4fr_70px_70px]"
    : "grid-cols-[70px_160px_3fr_4fr_70px]";


  /* ---------- JSX ---------- */
  return (
    <div className = "w-full overflow-hidden" >

      {/* ---------- HEADER ---------- */}
      <div
        className = { `grid ${ gridTemplate } items-center font-semibold uppercase tracking-wider text-indigo-200 bg-indigo-900/80 backdrop-blur sticky top-0 py-3 px-6 gap-x-7` }
      >
        {
          headings.map (
            ( heading, index ) => (
              <div
                key = { index }
                className = { `flex items-center ${ index === 0 || index >= headings.length - ( isTrash ? 2 : 1 )
                ? "justify-center" : "justify-start" } gap-1` }
              >
                { headingIconMap[ heading ] }
                { heading.trim () }
              </div>
            )
          )
        }
      </div>

      {/* ---------- BODY ---------- */}
      {
        emails.map (
          ( email ) => {
            const { displayName, displayEmail } = getDisplayContact (
              email,
              isTrash ? "Trash" : folder
            );

            return (
              <div
                key = { email.$id }
                className = "relative group hover:bg-indigo-50"
                onClick = { () => navigate ( `/email/${ folder }/${ email.$id }` ) }
              >

                {/* accent bar */}
                <span
                  className = "absolute left-0 top-0 h-full w-[3px] bg-purple-600 scale-y-0 group-hover:scale-y-100 origin-top transition-transform"
                />

                <div
                  className = { `grid ${ gridTemplate } items-center px-6 py-4 gap-x-7 cursor-pointer transition-transform transform group-hover:scale-[1.02]` }
                >

                  <div className = "flex justify-center items-center" >
                    {
                      email.isRead
                      ? <MailOpen className="text-indigo-400 w-5 h-5" />
                      : <Mail className="text-indigo-600 w-5 h-5" />
                    }
                  </div>

                  <span className = "text-sm text-gray-600" >
                    { formatDate ( email.timestamp ) }
                  </span>

                  <span className = "truncate text-sm text-gray-700" >
                    <span className = "text-md font-bold mr-3">
                      { displayName }
                    </span>

                    <span>
                      { displayEmail }
                    </span>
                  </span>

                  <span className = "truncate font-semibold text-indigo-900" >
                    { email.subject }
                  </span>

                  {
                    isTrash
                    ? (
                        <>
                          {/* Restore */}
                          <div className = "flex justify-center" >
                            <button
                              onClick = {
                                ( event ) => {
                                  event.stopPropagation ();
                                  restoreFromTrash ( email )
                                }
                              }
                              className = "text-indigo-600 hover:text-indigo-800"
                            >
                              <ArchiveRestore  size = { 20 } />
                            </button>
                          </div>

                          {/* Delete permanently */}
                          <div className = "flex justify-center" >
                            <button
                              onClick = {
                                ( event ) => {
                                  event.stopPropagation ();
                                  deleteFromTrash ( email.$id )
                                }
                              }
                              className = "text-red-600 hover:text-red-800"
                            >
                              <Trash size = { 20 } />
                            </button>
                          </div>
                        </>
                      )

                    : (
                      /* Inbox / Sent: single move-to-trash button */
                      <div className="flex justify-center" >
                        <button
                          onClick = {
                            ( event ) => {
                              event.stopPropagation ();
                              moveToTrash ( email, folder );
                            }
                          }
                          className = "text-red-600 hover:text-red-800"
                        >
                          <Shredder size = { 20 } />
                        </button>
                      </div>
                    )
                  }

                </div>

              </div>
            );
          }
        )
      }
    </div>
  );
}

export default Table;