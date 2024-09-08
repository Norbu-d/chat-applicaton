import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="p-4 h-screen flex items-center justify-center bg-custom">
      <Routes>
        {/* If the user is authenticated, navigate to Home. Otherwise, navigate to Login */}
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        {/* Redirect authenticated users from the login page to Home */}
        <Route path="login" element={authUser ? <Navigate to="/" /> : <Login />} />
        {/* Redirect authenticated users from the signup page to Home */}
        <Route path="signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
