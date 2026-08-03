import logo from "./logo.svg";
import "./App.css";
import AuthPage from "./Pages/AuthPage";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Components/AuthPage/Login";
import SignUp from "./Components/AuthPage/SignUp";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp/>}/>

        <Route
          path="/templates"
          element={
            <div className="text-center"> Features tab is under devlopment</div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
