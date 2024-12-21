export function Signup ( email, password )
{
  return async ( dispatch ) => {
    try
    {
      const response = await fetch ( "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAoB-HcUHT0yEXCiHtMI9ubVuSNv34MYZI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify
          (
            {
              email,
              password,
              returnSecureToken: true,
            }
          ),
        }
      );

      if ( !response.ok )
      {
        const errorData = await response.json ();
        throw new Error ( errorData.error.message || "Signup failed." );
      }

      return { success: true, message: "Signup successful." };
    }
    
    catch ( error )
    {
      return { success: false, message: error.message };
    }
  };
}