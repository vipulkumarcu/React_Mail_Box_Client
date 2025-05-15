import { createBrowserRouter } from 'react-router-dom';
import App from "./App";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import LandingPage from './Pages/LandingPage';

const routes = createBrowserRouter (
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "landing-page", element: <LandingPage /> },
        { path: "signup", element: <Signup /> },
      ],
    },
  ]
);

export default routes;