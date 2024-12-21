export function SendEmail ( emailData )
{
  return async ( dispatch ) => {
    try {
      const response = await fetch ( "https://mail-box-client-bdfdd-default-rtdb.firebaseio.com/data.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify ( 
            {
              emails: emailData
            }
          ),
        }
      );

      if ( !response.ok )
      {
        const errorData = await response.json ();
        throw new Error ( errorData.error || "Failed to send email." );
      }

      const data = await response.json ();

      return { success: true, message: "Email sent successfully.", data };
    }
    
    catch ( error )
    {
      return { success: false, message: error.message };
    }
  };
}