import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/Forms/LoginForm";
import SignupForm from "./Components/Forms/SignupForm";
import LandingPage from "./Pages/LandingPage";

function App ()
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = { <SignupForm /> } />
        <Route path = "/login" element = { <LoginForm /> } />
        <Route path = "/landing-page" element = { <LandingPage /> } />
        <Route path = "*" element = { <SignupForm /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;