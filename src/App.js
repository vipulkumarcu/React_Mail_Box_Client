import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEmail from "./Components/Email/CreateEmail";
import LoginForm from "./Components/Form/LoginForm";
import SignupForm from "./Components/Form/SignupForm";
import HomePage from "./Pages/HomePage";

function App ()
{
  return (
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
  );
}

export default App;