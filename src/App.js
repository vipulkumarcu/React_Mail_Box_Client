import { Outlet } from "react-router-dom";
import Alert from "./Components/Alert/Alert";
import Loader from "./Components/Loader/Loader";

function App ()
{
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