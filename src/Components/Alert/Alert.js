import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dequeueAlert } from "../../Features/AlertSlice";
import { X } from "lucide-react";

function getAlertStyles ( type )
{
  switch  ( type )
  {
    case "success":
      return {
        outer: "bg-green-900",
        inner: "bg-green-800",
        badge: "bg-green-500",
      };

    case "error":
      return {
        outer: "bg-red-900",
        inner: "bg-red-800",
        badge: "bg-red-500",
      };

    case "warning":
      return {
        outer: "bg-yellow-700",
        inner: "bg-yellow-600",
        badge: "bg-yellow-500",
      };

    case "info":
      return {
        outer: "bg-blue-900",
        inner: "bg-blue-800",
        badge: "bg-blue-500",
      };

    default:
      return {
        outer: "bg-gray-900",
        inner: "bg-gray-800",
        badge: "bg-gray-500",
      };
  }
}

function Alert ()
{
  const { alerts } = useSelector ( state => state.alert );
  const currentAlert = alerts[0]; // always show first in queue
  const dispatch = useDispatch ();

  useEffect (
    () => {
      if ( currentAlert )
      {
        const timer = setTimeout (
          () => {
            dispatch ( dequeueAlert () );
          }, currentAlert.duration
        );

        return () => clearTimeout ( timer );
      }
    }, [ currentAlert, dispatch ]
  );

  if ( !currentAlert ) return null;

  const { type , message } = currentAlert;
  const styles = getAlertStyles ( type );

  return (
    <div className = { `${ styles.outer } text-center py-4 lg:px-4` } >

      <div
        className = { `p-2 ${ styles.inner } items-center leading-none lg:rounded-full flex lg:inline-flex` }
        role="alert"
      >
        <span
          className = { `flex rounded-full ${ styles.badge } uppercase px-2 py-1 text-white text-xs font-bold mr-3` }
        >
          { type }
        </span>

        <span className = "font-semibold mr-2 text-white text-left flex-auto" >
          { message }
        </span>

        <button onClick = { () => dispatch ( dequeueAlert () ) } >
          <X className = "w-4 h-4 opacity-75 text-white" />
        </button>

      </div>

    </div>
  );
}

export default Alert;