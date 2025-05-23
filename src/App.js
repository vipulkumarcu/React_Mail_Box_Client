import { Outlet } from "react-router-dom";
import Alert from "./Components/Alert/Alert";
import Loader from "./Components/Loader/Loader";

function App ()
{
  // const expiresIn = localStorage.getItem("expiresIn");
  // const sessionId = localStorage.getItem("sessionId");

  // if (sessionId && Date.parse(expiresIn) - Date.now() < 5 * 60_000) { // <5 min left
  //   const { status, data } = await authentication.updateUserSession(sessionId);
  //   if (status) {
  //     dispatch(refreshSession({ expiresIn: data.expire })); // ✅ uses new action
  //   } else {
  //     dispatch(clearUser());
  //     navigate("/login");
  //   }
  // }

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