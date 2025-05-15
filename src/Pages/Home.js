import { Button } from "../Components";
import { useNavigate } from "react-router-dom";

function Home ()
{
  const navigate = useNavigate ();

  const buttonClass = "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-2.5 px-8 rounded-lg shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(99,102,241,0.5)] transform transition duration-300 ease-in-out tracking-wide";

  return (
    <div className = "min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 flex items-center justify-center px-4" >

      <div className = "max-w-3xl text-center" >

        <h1 className = "text-4xl md:text-5xl font-bold text-gray-800 mb-4" >
          Welcome to MailWise
        </h1>

        <p className = "text-lg md:text-xl text-gray-600 mb-8" >
          Manage your emails smartly and securely – fast, easy, and efficient.
        </p>

        <div className = "flex justify-center space-x-4" >

          <Button
            className = { buttonClass }
            onClick = { () => navigate ( "/signup" ) }
            buttonText = { "Sign Up" }
          />

          <Button
            className = { buttonClass }
            onClick = { () => navigate ( "/login" ) }
            buttonText = { "Log In" }
          />

        </div>

      </div>

    </div>
  );
}

export default Home;