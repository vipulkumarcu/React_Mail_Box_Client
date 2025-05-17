import { MailOpen, Shredder, Mail } from "lucide-react";
import { headingIconMap } from "../../Helpers/HelperIconVariables";

function formatDate ( date )
{
  return new Date( date ).toLocaleDateString ( "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
}

function Table ( { emails } )
{
  const headings = Object.keys ( headingIconMap );

  const isRead = false;

  return (
    <div className = "w-full overflow-hidden" >

      <div
        className = "grid grid-cols-[70px_160px_2fr_3fr_70px] items-center text font-semibold uppercase tracking-wider text-indigo-200 bg-indigo-900/80 backdrop-blur sticky top-0 py-3 px-6"
      >
        {
          headings.map (
            ( heading, index ) => (
              <div
                key = { index }
                className = { `flex items-center justify-${ index === 0 || index === headings.length - 1 ? "center" : "start"
                } gap-1` }
              >
                { headingIconMap[heading] }
                { heading.trim () }
              </div>
            )
          )
        }
      </div>

      {
        emails.map (
          ( email, index ) => (
            <div key = { index } className = "relative group hover:bg-indigo-50" >

              {/* accent bar */}
              <span
                className = "absolute left-0 top-0 h-full w-[3px] bg-purple-600 scale-y-0 group-hover:scale-y-100 origin-top transition-transform"
              />

              <div
                className = "grid grid-cols-[70px_160px_2fr_3fr_70px] items-center px-6 py-4 cursor-pointer transition-transform transform group-hover:scale-[1.02]"
              >

                <div className = "flex justify-center items-center" >
                  {
                    isRead
                    ? <MailOpen className="text-indigo-600 w-5 h-5" />
                    : <Mail className="text-gray-400 w-5 h-5" />
                  }
                </div>

                <span className = "text-sm text-gray-600" >
                  { formatDate ( email.date ) }
                </span>

                <span className = "truncate text-sm text-gray-700" >
                  { email.from }
                </span>

                <span className = "truncate font-semibold text-indigo-900" >
                  { email.subject }
                </span>

                <div className = "flex justify-center" >
                  <button
                    onClick = {
                      ( event ) => {
                        event.stopPropagation ();
                        // onDelete?.( email.id ?? idx );
                      }
                    }
                    className = "text-red-600 hover:text-red-800"
                  >
                    <Shredder size = { 20 } />
                  </button>

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