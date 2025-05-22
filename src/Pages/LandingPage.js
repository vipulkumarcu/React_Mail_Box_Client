import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../Features/LoaderSlice";
import { loadData } from "../Features/MailSlice";
import { formatEmailData } from "../Helpers/HelperTableFunctions";
import { Sidebar, Topbar, Content } from "../Components";
import InboxJSON from "../Data/Inbox.json";
import SentJSON  from "../Data/Sent.json";
import TrashJSON from "../Data/Trash.json";


function LandingPage ()
{
  const dispatch = useDispatch ();

  useEffect (
    () => {
      dispatch ( showLoader () );

      const timer = setTimeout (
        () => dispatch ( hideLoader () ), 1500
      );

      dispatch (
        loadData (
          {
            inbox: formatEmailData ( InboxJSON ),
            sent:  formatEmailData ( SentJSON ),
            trash: formatEmailData ( TrashJSON ),
          }
        )
      );

      return () => clearTimeout ( timer );
    }, [ dispatch ]
  );

  return (
    <div
      className = "w-screen h-screen grid grid-cols-[220px_1fr] grid-rows-[auto_1fr] bg-gradient-to-br from-blue-100 to-indigo-300"
    >
      <Sidebar />

      <Topbar />

      <Content />
    </div>
  );
}

export default LandingPage;