import { iconsMap } from "../../Helpers/HelperIconVariables";

function Sidebar ( { active, onSelect } )
{
  return (
    <aside className = "row-span-2 bg-gradient-to-br from-indigo-200 to-purple-200 shadow-md p-4 space-y-4" >

      <h2 className = "text-lg font-bold text-indigo-600 mb-4" > Folders </h2>

      <ul className = "space-y-2" >

        {
          Object.entries ( iconsMap ).map (
            ( [ key, Icon ] ) => (
              <li
                key = { key }
                onClick = { () => onSelect ( key ) }
                className = {
                  `flex items-center space-x-3 p-2 rounded-md cursor-pointer ${ key === active
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-50 text-gray-700"
                  }`
                }
              >
                <Icon
                  className = { `w-5 h-5 ${ key === active ? "text-white" : "text-indigo-500" }` }
                />
                <span className = "font-medium"> { key } </span>
              </li>
            )
          )
        }

      </ul>

    </aside>
  );
}

export default Sidebar;