import EnvironmentVariables from "../EnvironmentVariables/EnvironmentVariables";
import { errorMessages } from "../Helpers/HelperAlertMessages";

const { firebaseDatabaseUrl } = EnvironmentVariables;

/* helper – keeps “.json” & base‑URL logic in one place */
function url ( path )
{
  return `${firebaseDatabaseUrl}/users/${path}.json`;
}

class Database
{
  //------------- Create User -------------
  async createUser ( localId )
  {
    try
    {
      const response = await fetch ( url ( localId ),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify (
            {
              inbox: [],
              sent: [],
              trash: []
            }
          ),
        }
      );

      if ( !response.ok )
      {
        const error = await response.json ();
        return {
          status: false,
          message: errorMessages[error.error.message] || errorMessages.USER_CREATION_FAILED
        };
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

  //------------- Get User --------------
  async getUser ( localId )
  {
    try
    {
      const response = await fetch ( url ( localId ) );

      if ( !response.ok )
      {
        const error = await response.json ();
        return {
          status: false,
          message: errorMessages[error.error.message] || errorMessages.USER_DATA_FETCH_FAILED
        };
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

  //------------- Send Email --------------
  async sendEmail ( localId, emailObj )
  {
    try
    {
      const response = await fetch ( url ( `${localId}/sent` ),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify ( emailObj ),
        }
      );

      if ( !response.ok )
        {
        const error = await response.json ();
        return {
          status: false,
          message: errorMessages[error.error.message] || errorMessages.MAIL_SEND_FAILED
        };
      }

      const { name: pushId } = await response.json ();
      return {
        status: true,
        data: { pushId }
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

  //------------- Move to Trash --------------
  async moveToTrash ( localId, folder, emailKey )
  {
    try
    {
      /* 1 ─ fetch */
      const getresponse = await fetch ( `${firebaseDatabaseUrl}users/${localId}/${folder}/${emailKey}.json` );

      if ( !getresponse.ok )
      {
        const error = await getresponse.json ();
        return {
          status: false,
          message: errorMessages[error.error.message] || errorMessages.MAIL_NOT_FOUND
        };
      }

      const mail = await getresponse.json();

      /* 2 ─ post to trash */
      const postresponse = await fetch ( `${firebaseDatabaseUrl}users/${localId}/trash.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify ( mail ),
        }
      );

      if ( !postresponse.ok )
      {
        const error = await postresponse.json ();
        return {
          status: false,
          message: errorMessages[error.error.message] || errorMessages.MAIL_TRASH_FAILED
        };
      }

      /* 3 ─ delete original */
      await fetch ( `${firebaseDatabaseUrl}users/${localId}/${folder}/${emailKey}.json`,
        {
          method: "DELETE"
        }
      );

      return {
        status: true
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

  //------------- Delete Email --------------
  async deleteEmail ( localId, emailKey )
  {
    try
    {
      const response = await fetch ( `${firebaseDatabaseUrl}users/${localId}/trash/${emailKey}.json`,
        {
          method: "DELETE"
        }
      );

      if ( !response.ok )
        {
        const error = await response.json ();
        return {
          status: false,
          message: errorMessages[error.error.message] || errorMessages.MAIL_DELETION_FAILED
        };
      }

      return {
        status: true
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
}

const database = new Database ();

export default database;