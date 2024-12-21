<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEmail from "./Components/Email/CreateEmail";
import LoginForm from "./Components/Form/LoginForm";
import SignupForm from "./Components/Form/SignupForm";
import HomePage from "./Pages/HomePage";
=======
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/Forms/LoginForm";
import SignupForm from "./Components/Forms/SignupForm";
import LandingPage from "./Pages/LandingPage";
import ComposeEmail from "./Components/Email/ComposeEmail";
import CreateEmail from "./Components/Email/CreateEmail";
>>>>>>> 5785655643ce0befb31d0016ff19c262c75c7975

function App ()
{
  return (
<<<<<<< HEAD
    <Router>
      <Routes>
        <Route path = "/" element = { <SignupForm /> } />
        <Route path = "/login" element = { <LoginForm /> } />
        <Route path = "/signup" element = { <SignupForm /> } />
        <Route path = "/create-email" element = { <CreateEmail /> } />
        <Route path = "/home-page" element = { <HomePage /> } />
        <Route path = "*" element = { <SignupForm /> } />
      </Routes>
    </Router>
=======
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
>>>>>>> 5785655643ce0befb31d0016ff19c262c75c7975
  );
}

export default App;