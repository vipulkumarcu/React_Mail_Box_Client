import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../Features/LoaderSlice";
import useEmails from "../Helpers/HelperTableFunctions";
import { Sidebar, Topbar, Content } from "../Components";


// useEffect to fetch emails when refreshed after checking local storage for user data

function LandingPage ()
{
  const [ folder, setFolder ] = useState ( "Inbox" );
  const [ currentPage, setCurrentPage ] = useState ( 1 );
  const [ filter, setFilter ] = useState ( "" );

  const displayName = localStorage.getItem ( "displayName" ) || "";

  const dispatch = useDispatch ();

  //-------- Mimicking Signup Loader --------//
  useEffect (
    () => {
      showLoader ();

      const timer = setTimeout (
        () => dispatch ( hideLoader () ), 4000
      );

      return () => clearTimeout ( timer );
    }
  );


  const emails = useEmails ( folder, filter );

  function paginate ( dir )
  {
    if ( dir === "prev" && currentPage > 1 )
    {
      setCurrentPage ( ( p ) => p - 1 );
    }

    if ( dir === "next" )
    {
      const total = Math.ceil ( emails.length / 7 );
      setCurrentPage ( ( p ) => ( p < total ? p + 1 : p ) );
    }
  }

  return (
    <div
      className = "w-screen h-screen grid grid-cols-[220px_1fr] grid-rows-[auto_1fr] bg-gradient-to-br from-blue-100 to-indigo-300"
    >
      <Sidebar
        active = { folder }
        onSelect = {
          ( f ) => {
            setFolder ( f );
            setCurrentPage ( 1 );
          }
        }
      />

      <Topbar filter = { filter } setFilter = { setFilter } displayName = { displayName } />

      <Content
        emails = { emails }
        page = { currentPage }
        perPage = { 7 }
        onPaginate = { paginate }
        folderLabel = { folder }
      />
    </div>
  );
}

export default LandingPage;