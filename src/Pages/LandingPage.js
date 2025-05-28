import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Sidebar, Topbar, Content } from "../Components";
import { selectLoaded } from "../Features/MailSlice";
import { useEmails } from "../Hooks/useEmails";

function LandingPage ()
{
  /* ──────────────────── CUSTOM HOOK ──────────────────── */
  const { fetchEmails } = useEmails ();

  const alreadyLoaded = useSelector ( selectLoaded );

  /* ──────────────────── LOCAL STORAGE ──────────────────── */
  const userId = localStorage.getItem ( "userId" );

  /* ────────────── USEEFFECT TO FETCH ────────────── */
  useEffect (
    () => {
      if ( !userId || alreadyLoaded ) return;

      const controller = new AbortController ();
      fetchEmails ( userId, controller.signal );

      return () => controller.abort ();

    }, [ alreadyLoaded, userId, fetchEmails ]
  );

  /* ───────────────────────── JSX ───────────────────────── */
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