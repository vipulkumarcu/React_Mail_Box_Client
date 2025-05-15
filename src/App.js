import { Outlet } from "react-router-dom";
import Alert from "./Components/Alert/Alert";

function App ()
{
  return (
    <div>

      <header>
        <Alert />
      </header>

      <main>
        <Outlet />
      </main>

    </div>
  );
}

export default App;