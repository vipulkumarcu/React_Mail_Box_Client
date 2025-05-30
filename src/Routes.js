import { createBrowserRouter } from 'react-router-dom';
import App from "./App";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import LandingPage from './Pages/LandingPage';
import ComposeEmail from './Pages/ComposeEmail';
import EmailView from './Pages/EmailView';
import { AuthLayout } from './Components';

const routes = createBrowserRouter (
  [
    {
      path    : "/",
      element : <App />,
      children: [
        {
          index   : true,
          element : (
            <AuthLayout authentication = { false } >
              <Home />
            </AuthLayout>
          ),
        },

        {
          path    : "signup",
          element : (
            <AuthLayout authentication = { false } >
              <Signup />
            </AuthLayout>
          ),
        },

        {
          path    : "login",
          element : (
            <AuthLayout authentication = { false } >
              <Login />
            </AuthLayout>
          ),
        },

        {
          path    : "landing-page",
          element : (
            <AuthLayout authentication = { true } >
              <LandingPage />
            </AuthLayout>
          ),
        },

        {
          path    : "compose-email",
          element : (
            <AuthLayout authentication = { true } >
              <ComposeEmail />
            </AuthLayout>
          ),
        },

        {
          path    : "email/:folder/:id",
          element : (
            <AuthLayout authentication = { true } >
              <EmailView />
            </AuthLayout>
          ),
        },
      ],
    },
  ]
);

export default routes;