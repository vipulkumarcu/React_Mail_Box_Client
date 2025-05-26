import { useDispatch, useSelector } from "react-redux";
import { setFolder } from "../../Features/MailSlice";
import { iconsMap } from "../../Helpers/HelperIconVariables";

function Sidebar ( )
{
  const dispatch = useDispatch ();
  const active = useSelector ( ( state ) => state.mail.folder );
  const unReadCount = useSelector ( ( state ) => state.mail.unReadCount );

  return (
    <aside className = "row-span-2 bg-gradient-to-br from-indigo-200 to-purple-200 shadow-md p-5 space-y-4" >

      <h2 className = "text-xl font-bold text-indigo-600 mb-4" > Folders </h2>

      <ul className = "space-y-2" >

        {
          Object.entries ( iconsMap ).map (
            ( [ key, Icon ] ) => (
              <li
                key = { key }
                onClick = { () => dispatch ( setFolder ( key ) ) }
                className = {
                  `flex items-center space-x-3 p-2 rounded-md cursor-pointer ${ key === active
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-100 text-gray-700"
                  }`
                }
              >
                <Icon
                  className = { `w-5 h-5 ${ key === active ? "text-white" : "text-indigo-500" }` }
                />
                <span className = "font-medium">
                  { key }

                  {
                    key === "Inbox" &&
                    <span
                      className = {
                        `inline-flex ml-6 items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 rounded-full ${ key === active ? "bg-fuchsia-600" : "bg-fuchsia-700"}`
                      }
                    >
                      { unReadCount }
                    </span>
                  }
                </span>
              </li>
            )
          )
        }

      </ul>

    </aside>
  );
}

export default Sidebar;