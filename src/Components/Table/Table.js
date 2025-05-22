import { useDispatch } from "react-redux";
import { addToTrash, removeFromTrash } from "../../Features/MailSlice";
import { headingIconMap } from "../../Helpers/HelperIconVariables";
import { formatDate, tableHeadings } from "../../Helpers/HelperTableFunctions";
import { MailOpen, Shredder, Mail, Trash } from "lucide-react";

function Table ( { emails, folder } )
{
  const dispatch = useDispatch ();
  const headings = tableHeadings ( folder );

  return (
    <div className = "w-full overflow-hidden" >

      <div
        className = "grid grid-cols-[70px_135px_2fr_3fr_70px] items-center text font-semibold uppercase tracking-wider text-indigo-200 bg-indigo-900/80 backdrop-blur sticky top-0 py-3 px-6"
      >
        {
          headings.map (
            ( heading, index ) => (
              <div
                key = { index }
                className = { `flex items-center justify-${ index === 0 || index === headings.length - 1 ? "center" : "start"
                } gap-1` }
              >
                { headingIconMap[ heading ] }
                { heading.trim () }
              </div>
            )
          )
        }
      </div>

      {
        emails.map (
          ( email ) => (
            <div key = { email.id } className = "relative group hover:bg-indigo-50" >

              {/* accent bar */}
              <span
                className = "absolute left-0 top-0 h-full w-[3px] bg-purple-600 scale-y-0 group-hover:scale-y-100 origin-top transition-transform"
              />

              <div
                className = "grid grid-cols-[70px_135px_2fr_3fr_70px] items-center px-6 py-4 cursor-pointer transition-transform transform group-hover:scale-[1.02]"
              >

                <div className = "flex justify-center items-center" >
                  {
                    email.isRead
                    ? <MailOpen className="text-indigo-400 w-5 h-5" />
                    : <Mail className="text-indigo-600 w-5 h-5" />
                  }
                </div>

                <span className = "text-sm text-gray-600" >
                  { email.receivedDate ? formatDate ( email.receivedDate ) : formatDate ( email.sentDate ) }
                </span>

                <span className = "truncate text-sm text-gray-700" >
                  <span className = "text-md font-bold mr-3">
                    { email.from ? email.from : email.to }
                  </span>

                  <span>
                     { email.emailId }
                  </span>
                </span>

                <span className = "truncate font-semibold text-indigo-900" >
                  { email.subject }
                </span>

                <div className = "flex justify-center" >
                  {
                    folder === "Trash"
                    ? <button
                        onClick = {
                          ( event ) => {
                            event.stopPropagation ();
                            dispatch ( removeFromTrash ( { ...email } ) );
                          }
                        }
                        className = "text-red-600 hover:text-red-800"
                      >
                        <Trash size = { 20 } />
                      </button>

                    : <button
                      onClick = {
                        ( event ) => {
                          event.stopPropagation ();
                          dispatch ( addToTrash ( { ...email, folder } ) );
                        }
                      }
                      className = "text-red-600 hover:text-red-800"
                    >
                      <Shredder size = { 20 } />
                    </button>
                  }

                </div>

              </div>

            </div>
          )
        )
      }
    </div>
  );
}

export default Table;