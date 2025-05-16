import { Calendar, MailOpen, FileText } from "lucide-react";

const headings = [ "Date", "From", "Subject" ];

const headingIconMap = {
  Date: <Calendar size = { 14 } />,
  From: <MailOpen size = { 14 } />,
  Subject: <FileText size = { 14 } />,
}

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
  return (
    <div className = "shadow-lg ring-1 ring-indigo-100 overflow-hidden bg-white" >

      {/* sticky header */}
      <div className = "grid grid-cols-12 items-center text-md font-semibold uppercase tracking-wider text-indigo-200 bg-indigo-900/80 backdrop-blur sticky top-0 py-3 px-10" >

        {
          headings.map (
            ( heading ) => (
              <span
                key = { heading }
                className = "col-span-3 flex items-center gap-1"
              >
                { headingIconMap[ heading ] }
                { heading }
              </span>
            )
          )
        }

      </div>

      {
        emails.map (
          ( email, index ) => (
            <div
              key = { index }
              className = "relative group hover:bg-indigo-50"
            >

              {/* accent bar */}
              <span className = "absolute left-0 top-0 h-full w-1 bg-purple-600 scale-y-0 group-hover:scale-y-100 origin-top transition-transform" />

              <div
                className = "grid grid-cols-12 items-center px-10 py-4 transition-transform transform group-hover:scale-[1.02] cursor-pointer"
              >

                <span className = "col-span-3 text-sm text-gray-600" >
                  { formatDate ( email.date ) }
                </span>

                <span className = "col-span-3 truncate text-sm text-gray-700" >
                  { email.from }
                </span>

                <span className = "col-span-3 truncate px-1 font-semibold text-indigo-900" >
                  { email.subject }
                </span>

              </div>

            </div>
          )
        )
      }

    </div>
  );
}

export default Table;