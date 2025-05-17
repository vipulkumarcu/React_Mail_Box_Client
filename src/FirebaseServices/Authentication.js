import environmentVariables from "../EnvironmentVariables/EnvironmentVariables";

const { firebaseUrl, firebaseApiKey } = environmentVariables;

function url ( path )
{
  return `${firebaseUrl}${path}?key=${firebaseApiKey}`;
}

class Authentication
{
  async signup ( email, password, name )
  {
    try
    {
      const response = await fetch ( url ( "signUp" ),
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
      const error = await response.json ();
      return {
        status: false,
        message: error.error.message,
      };
    }

    const data = await response.json ();

    // Updating the user's display name
    const profileUpdate = await this.updateProfile (
      {
        idToken: data.idToken,
        displayName: name,
      }
    );

    if ( !profileUpdate.status )
    {
      return {
        status: false,
        message: "User created, but failed to update profile",
      };
    }

    // Returning sign-up response
    return {
      status: true,
      data: {
        idToken: data.idToken,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
        displayName: name,
        localId: data.localId,
      },
    };
  }

    catch ( error )
    {
      return {
        status: false,
        message: error.message,
      };
    }
  }

  async login ( email, password )
  {
    try
    {
      const response = await fetch ( url ( "signInWithPassword" ),
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
        const error = await response.json ();
        return { status: false, message: error.error.message };
      }

      const authData = await response.json ();

      // Calling getUserData to get the user's profile
      const profileResp = await this.getUserData ( authData.idToken );

      if ( !profileResp.status )
      {
        return {
          status: false,
          message: profileResp.message
        };
      }

      const user = profileResp.data;

      return {
        status: true,
        data: {
          idToken: authData.idToken,
          refreshToken: authData.refreshToken,
          expiresIn: authData.expiresIn,
          displayName: user.displayName || "",
          email: user.email,
        },
      };
    }

    catch ( error )
    {
      return {
        status: false,
        message: error.message
      };
    }
  }

  async updateProfile ( { idToken, displayName } )
  {
    try
    {
      const response = await fetch ( url ( "update" ),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify (
            {
              idToken,
              displayName,
              returnSecureToken: true,
            }
          ),
        }
      );

      if ( !response.ok )
      {
        const error = await response.json ();
        return { status: false, message: error.error.message };
      }

      const data = await response.json ();
      return {
        status: true,
        data
      };
    }

    catch ( error )
    {
      return {
        status: false,
        message: error.message
      };
    }
  }

  async getUserData ( idToken )
  {
    try
    {
      const response = await fetch ( url ( "lookup" ),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify (
            {
              idToken,
            }
          ),
        }
      );

      if ( !response.ok )
      {
        const error = await response.json ();
        return {
          status: false,
          message: error.error.message
        };
      }

      const data = await response.json ();
      return {
        status: true,
        data: data.users[0]
      };
    }

    catch ( error )
    {
      return {
        status: false,
        message: error.message
      };
    }
  }

  async refreshIdToken ( refreshToken )
  {
    const response = await fetch ( `https://securetoken.googleapis.com/v1/token?key=${firebaseApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`
      }
    );

    const data = await response.json ();

    return {
      idToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
    };
  }
}

const authentication = new Authentication ();

export default authentication;