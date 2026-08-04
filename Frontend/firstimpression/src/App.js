import logo from "./logo.svg";
import "./App.css";
import AuthPage from "./Pages/AuthPage";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Components/AuthPage/Login";
import SignUp from "./Components/AuthPage/SignUp";
import DashboardPage from "./Pages/DashboardPage";
import ProfilePage from "./Pages/ProfilePage";
import { useUser } from "./Contexts/UserContext";
import ProtectedRoute from "./Contexts/ProtectedRoutes";
import { useEffect } from "react";

function App() {
  const { setUser, loading, setLoading } = useUser();
  const API_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


        if (!response.ok) {
          localStorage.removeItem("jwtToken");
          setLoading(false);
          return;
        }

        const data = await response.json();

        setUser(data);
        
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/sign-in" element={<AuthPage />} />
        <Route path="/sign-up" element={<AuthPage />} />
        <Route path="/forgot-password" element={<AuthPage />} />
        <Route path="/otp" element={<AuthPage />} />
        <Route path="/change-password" element={<AuthPage />} />

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
