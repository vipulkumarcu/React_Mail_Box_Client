const webApiKey = "AIzaSyBQK8g1XN2r7HdZx1NtZQrC7w7eH3b0t2w";
class Authentication
{
  async signup ( email, password )
  {
    try
    {
      const response = await fetch ( `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${webApiKey}`,
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

      if ( response.ok )
      {
        const data = await response.json ();
        return data;
      }
    }

    catch ( error )
    {
      return error.message;
    }
  }
}

const authentication = new Authentication ();

export default authentication;