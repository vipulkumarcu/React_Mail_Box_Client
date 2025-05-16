import { Send, FileText, Trash2, Star, Archive, Inbox, MessageSquareWarning } from "lucide-react";

/* folder list is static so we export it for reuse */
export const emailFolders = [
  { name: "Inbox", icon: Inbox },
  { name: "Sent", icon: Send },
  { name: "Drafts", icon: FileText },
  { name: "Spam", icon: MessageSquareWarning },
  { name: "Trash", icon: Trash2 },
  { name: "Starred", icon: Star },
  { name: "Archive", icon: Archive },
];

function Sidebar ( { active, onSelect } )
{
  return (
    <aside className = "row-span-2 bg-gradient-to-br from-indigo-200 to-purple-200 shadow-md p-4 space-y-4" >

      <h2 className = "text-lg font-bold text-indigo-600 mb-4" > Folders </h2>

      <ul className = "space-y-2" >

        {
          emailFolders.map (
            ( { name, icon: Icon } ) => (
              <li
                key = { name }
                onClick = { () => onSelect ( name ) }
                className = {
                  `flex items-center space-x-3 p-2 rounded-md cursor-pointer ${name === active
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-indigo-50 text-gray-700"}`
                }
              >
                <Icon
                  className = {
                    `w-5 h-5 ${ name === active ? "text-white" : "text-indigo-500" }`
                  }
                />
                <span className = "font-medium" > { name } </span>
              </li>
            )
          )
        }

      </ul>

    </aside>
  );
}

export default Sidebar;