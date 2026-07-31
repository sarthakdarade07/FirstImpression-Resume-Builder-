import logo from "./logo.svg";
import "./App.css";
import AuthPage from "./Pages/AuthPage";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
       <Route path="/auth" element={<AuthPage/>} /> 
      </Routes>
    </>
  );
}

export default App;
