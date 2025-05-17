import { useEffect, useState } from "react";
import { Sidebar, Topbar, Content } from "../Components";

// Dummy Emails
import dummyData from "../DummyData/DummyData";
import database from "../FirebaseServices/Database";
import { useDispatch } from "react-redux";
import { enqueueAlert } from "../Features/AlertSlice";
import { addToInbox } from "../Features/MailSlice";

function LandingPage ()
{
  const [ folder, setFolder ] = useState ( "Inbox" );
  const [ currentPage, setCurrentPage ] = useState ( 1 );
  const [ filter, setFilter ] = useState ( "" );

  const dispatch = useDispatch ();

  const displayName = localStorage.getItem ( "displayName" ) || "";
  const localId = localStorage.getItem ( "localId" );

  const emails = dummyData.filter (
    ( e ) =>
      e.subject.toLowerCase ().includes ( filter.toLowerCase () ) ||
      e.from.toLowerCase ().includes ( filter.toLowerCase () )
  );

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