import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/Forms/LoginForm";
import SignupForm from "./Components/Forms/SignupForm";
import LandingPage from "./Pages/LandingPage";
import ComposeEmail from "./Components/Email/ComposeEmail";
import CreateEmail from "./Components/Email/CreateEmail";

function App ()
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = { <SignupForm /> } />
        <Route path = "/login" element = { <LoginForm /> } />
        <Route path = "/landing-page" element = { <LandingPage /> } />
        <Route path = "/compose-email" element = { <ComposeEmail /> } />
        <Route path = "/create-email" element = { <CreateEmail /> } />
        <Route path = "*" element = { <SignupForm /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;