import { MailPlus } from "lucide-react";
import { useSelector } from "react-redux";

function Loader ()
{
  const show = useSelector ( ( state ) => state.loader.show );

  if ( !show ) return null;

  return (
    <div
      className = "fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm bg-indigo-900/20 select-none"
    >

      <div className = "relative w-24 h-24 animate-spin-slow">

        <div
          className = "absolute inset-0 rounded-full bg-gradient-to-tr from-fuchsia-500 to-indigo-500 blur-lg opacity-70"
        >
        </div>

        <div className = "relative flex items-center justify-center w-24 h-24 rounded-full bg-indigo-950/80" >
          <MailPlus className = "w-10 h-10 text-fuchsia-300 animate-pulse" />
        </div>

      </div>

    </div>
  );
}

export default Loader;
