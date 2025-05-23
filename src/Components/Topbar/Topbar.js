import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../Features/UserSlice";
import { setFilter } from "../../Features/MailSlice";
import { successMessages } from "../../Helpers/HelperAlertMessages";
import { showSuccessMessage } from "../../Helpers/HelperAlertFunctions";
import { CircleUserRound, LogOut, MailSearch, UserRoundPen } from "lucide-react";
import Button from "../Button/Button";
import authentication from "../../AppwriteServices/Authentication";

function Topbar ()
{
  const [ open, setOpen ] = useState ( false );

  const filter = useSelector ( ( state ) => state.mail.filter );
  const displayName = useSelector ( ( state ) => state.user.displayName );

  const navigate = useNavigate ();
  const dispatch = useDispatch ();

  async function logout ()
  {
    await authentication.logout ();
    dispatch ( clearUser () );
    navigate ( "/" );
    showSuccessMessage ( dispatch, successMessages.LOGOUT_SUCCESS );
  };

  return (
    <header
      className = "flex items-center justify-between px-6 py-4 bg-gradient-to-br from-indigo-200 to-purple-200 shadow-sm"
    >

      {/* Search */}
      <div className = "flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-md w-full max-w-xl" >

        <MailSearch className = "text-indigo-500 w-5 h-5" />

        <input
          type = "text"
          placeholder = "Search..."
          value = { filter }
          onChange = { ( e ) => dispatch ( setFilter ( e.target.value ) ) }
          className = "w-full text-indigo-700 bg-transparent outline-none"
        />

      </div>

      {/* Avatar / dropdown */}
      <div className = "flex items-center gap-4 relative ml-4" >

        <span className = "text-indigo-600 text-2xl font-semibold" >
          Welcome { displayName ? `, ${ displayName }` : "" }
        </span>

        <button onClick = { () => setOpen ( ( p ) => !p ) } className = "group" >
          <CircleUserRound
            className = "w-12 h-12 rounded-full bg-indigo-200 text-indigo-600 group-hover:scale-110 transition-transform duration-200"
          />
        </button>

        {
          open &&
          (
            <div className = "absolute right-0 top-full mt-2 w-44 bg-slate-200 rounded-xl shadow-lg z-50" >

              <ul className = "py-2 text-base" >

                <Button
                  buttonText = {
                    <span className = "flex items-center gap-4" >
                      <UserRoundPen size = { 18 } />
                      Profile
                    </span>
                  }
                  className = "w-full text-start px-5 py-2 hover:bg-slate-50 hover:rounded-xl"
                  onClick = { () => navigate ( "/profile" ) }
                />

                <Button
                  buttonText = {
                    <span className = "flex items-center gap-4" >
                      <LogOut size = { 18 } />
                      Logout
                    </span>
                  }
                  className = "w-full text-start px-5 py-2 text-red-600 hover:bg-red-200 hover:rounded-xl"
                  onClick = { logout }
                />

              </ul>

            </div>
          )
        }

      </div>

    </header>
  );
}

export default Topbar;