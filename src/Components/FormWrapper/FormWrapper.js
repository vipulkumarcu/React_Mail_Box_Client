import { useNavigate } from "react-router-dom";
import { Button } from "../index";

function FormWrapper ( { title, children, buttonText, link = "#" } )
{
  const navigate = useNavigate ();
  return (
    <div className = "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100  px-4" >

      <div className = "w-full max-w-lg bg-gradient-to-br from-indigo-150 to-purple-350  shadow-md rounded-lg overflow-hidden" >

        <div className = "bg-indigo-500 text-white text-center py-3 shadow hover:bg-blue-400 pointer-events-none" >
          <h3 className = "text-lg font-semibold" > { title } </h3>
        </div>

        <div className = "px-8 pt-6 pb-4" > { children } </div>

        <div className = "flex justify-center items-center mb-3" >
          <Button
            buttonText = { buttonText }
            onClick = { () => navigate ( link ) }
            className = "bg-gradient-to-r from-lime-700 to-green-700 text-white font-semibold py-2 px-6 border-b-4 border-green-900 rounded-md shadow-md hover:scale-105 hover:border-b-2 active:scale-95 transition-all duration-300 ease-in-out"
          />
        </div>

        <p className = "text-center text-gray-500 text-xs py-2" >
          &copy;2025 VA Tech. All rights reserved.
        </p>

      </div>

    </div>
  );
}

export default FormWrapper;