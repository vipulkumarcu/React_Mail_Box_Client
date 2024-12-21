export function Login ( email, password )
{
  return async ( dispatch ) => {
    try
    {
      const response = await fetch ( "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAoB-HcUHT0yEXCiHtMI9ubVuSNv34MYZI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify (
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
        throw new Error ( errorData.error.message || "Login failed." );
      }

      const data = await response.json ();

      localStorage.setItem ( "Email", data.email );
      localStorage.setItem ( "Login Token", data.idToken );
      localStorage.setItem ( "Login Status", true );

      return { success: true, message: "Login successful." };
    }
    
    catch ( error )
    {
      return { success: false, message: error.message };
    }
  };
}