import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { showLoader, hideLoader } from "../../Features/LoaderSlice"


/* ──────────────────────────── UTILITY ──────────────────────────── */
function isAuthenticated ()
{
  const sessionId = localStorage.getItem ( "sessionId" );
  const expiresIn = Number ( localStorage.getItem ( "expiresIn" ) );

  if ( !sessionId ) return false;

  if ( expiresIn && Date.now () > expiresIn ) return false;

  return true;
}


/* ──────────────────────────── LAYOUT ──────────────────────────── */
function AuthLayout ( { children, authentication } )
{
  /* ---------- HOOKS ---------- */
  const navigate = useNavigate ();
  const dispatch = useDispatch ();
  const location  = useLocation ();

  const loggedIn = isAuthenticated();

  /* ────────────────── USEEFFECT ────────────────── */
  useEffect (
    () => {
      dispatch ( showLoader () );

      /* ─── PRIVATE ROUTE: user must be logged-in ─── */
      if ( authentication && !loggedIn )
      {
        if ( location.pathname !== "/" )
        {
          navigate ( "/", { replace: true } );              // Replace history entry
        }
        dispatch ( hideLoader () );
        return;
      }

      /* ─── GUEST-ONLY ROUTE: user must be logged-out ─── */
      if ( !authentication && loggedIn )
      {
        if (location.pathname !== "/landing-page")
        {
          navigate ( "/landing-page", { replace: true } );
        }
        dispatch ( hideLoader () );
        return;
      }

      return () => dispatch ( hideLoader () );

    },[ authentication, loggedIn, location.pathname, navigate, dispatch ]
  );

  /* ────────────────── JSX ────────────────── */
  return (
    <>
      { children }
    </>
  );
}

export default AuthLayout;