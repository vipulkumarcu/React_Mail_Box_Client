import { Outlet } from "react-router-dom";
import Alert from "./Components/Alert/Alert";
import Loader from "./Components/Loader/Loader";
import { useAuthenticate } from "./Hooks/useAuthenticate";
import { useEffect } from "react";

function App ()
{
  /*---------- Hook ----------*/
  const { logout, refreshSessionId } = useAuthenticate ();


  /*---------- Refresh session ----------*/
  useEffect (
    () => {
      // Get data from localStorage
      const expiresIn = localStorage.getItem ( "expiresIn" );
      const sessionId = localStorage.getItem ( "sessionId" );

      // Nothing to do, if there is no session
      if ( !expiresIn || !sessionId ) return;

      // Calculate when the session will expire
      const expiresAt = Date.parse ( expiresIn );
      const threshold = 2 * 60 * 1000; // 2 minutes

      const now = Date.now ();
      const timeLeft = expiresAt - now;

      // Session has expired
      if ( timeLeft <= 0 )
      {
        logout ();
        return;
      }

      // Already within threshold, refresh now
      if ( timeLeft <= threshold )
      {
        refreshSessionId ( sessionId, expiresIn, threshold, threshold );
        return;
      }

      // Otherwise, set a timer to refresh *when* timeLeft reaches threshold
      const timeoutId = setTimeout (
        () => {
          refreshSessionId ( sessionId, expiresIn, threshold, threshold );
        }, timeLeft - threshold
      );

      // Cleanup timer on unmount or dependency change
      return () => clearTimeout ( timeoutId );

    }, [ refreshSessionId, logout ]
  );


  /*---------- JSX ----------*/
  return (
    <div>

      <header>
        <Alert />
      </header>

      <aside>
        <Loader />
      </aside>

      <main>
        <Outlet />
      </main>

    </div>
  );
}

export default App;