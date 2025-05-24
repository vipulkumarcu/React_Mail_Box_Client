import { X } from "lucide-react";

function EmailInput ( { label, emails, setEmails } )
{
  function handleKeyDown ( event )
  {
    const input = event.target.value.trim ();

    if ( ( event.key === "Enter" || event.key === "," ) && input )
    {
      event.preventDefault ();

      if ( !emails.includes ( input ) )
      {
        setEmails ( [ ...emails, input ] );
      }
      event.target.value = "";
    }
  };

  function handleRemove ( emailToRemove )
  {
    setEmails ( emails.filter ( ( email ) => email !== emailToRemove ) );
  };

  return (
    <div className = "mb-4" >

      {
        label &&
        (
          <label className = "block text-indigo-600 font-medium mb-1" >
            { label }
          </label>
        )
      }

      <div
        className = "w-full px-3 py-2 bg-indigo-50 border border-indigo-200 rounded-md focus-within:ring  focus-within:border-indigo-600 flex flex-wrap gap-2 shadow-sm"
      >
        {
          emails.map ( ( email, index ) =>
            (
              <span
                key = { index }
                className = "flex items-center bg-indigo-200 text-indigo-900 text-sm px-2 py-1 rounded-full"
              >
                { email }
                <button
                  type = "button"
                  onClick = { () => handleRemove ( email ) }
                  className = "ml-2 hover:text-red-600 focus:outline-none"
                >
                  <X size = { 14 } />
                </button>
              </span>
            )
          )
        }

        <input
          type = "text"
          onKeyDown = { handleKeyDown }
          placeholder = "Type email & press Enter to add more"
          className = "bg-transparent outline-none flex-grow min-w-[120px]"
        />

      </div>

    </div>
  );
}

export default EmailInput;