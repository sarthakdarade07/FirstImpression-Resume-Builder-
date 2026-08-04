import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "../Components/AuthPage/Login";
import SignUp from "../Components/AuthPage/SignUp";
import ForgotPassword from "../Components/AuthPage/ForgotPassword";
import OtpVerification from "../Components/AuthPage/OtpVerification";
import ChangePassword from "../Components/AuthPage/ChangePassword";
import SuccessToast from "../Components/Notifications/SuccessToast";

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  
  const getView = () => {
    const path = location.pathname;
    if (path === "/sign-up") return "signup";
    if (path === "/forgot-password") return "forgotPassword";
    if (path === "/otp") return "otp";
    if (path === "/change-password") return "changePassword";
    return "login";
  };
  
  const currentView = getView();

  // State to pass between forgot password steps
  // We can initialize from location state if navigated with state, or fallback to local state
  const [resetEmail, setResetEmail] = useState(location.state?.email || "");
  const [resetToken, setResetToken] = useState(location.state?.token || "");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("verified") === "true") {
      setShowToast(true);
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location]);

  return (
    // We make this relative and hidden overflow so the animations don't cause scrollbars
    <div className="relative min-h-screen bg-gray-100 overflow-hidden">
      {showToast && (
        <SuccessToast
          message="Email Verified Successfully! Please log in."
          onClose={() => setShowToast(false)}
        />
      )}
      {/* mode="wait" ensures the old page fades out completely BEFORE the new one fades in */}
      <AnimatePresence mode="wait">
        {currentView === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full">
            <Login
              onNavigateToSignUp={() => navigate("/sign-up")}
              onNavigateToForgotPassword={() => navigate("/forgot-password")}
            />
          </motion.div>
        )}
        
        {currentView === "signup" && (
          <motion.div
            key="signup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full">
            <SignUp onNavigateToLogin={() => navigate("/sign-in")} />
          </motion.div>
        )}

        {currentView === "forgotPassword" && (
          <motion.div
            key="forgotPassword"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full">
            <ForgotPassword
              onBackToLogin={() => navigate("/sign-in")}
              onNavigateToOtp={(email) => {
                setResetEmail(email);
                navigate("/otp", { state: { email } });
              }}
            />
          </motion.div>
        )}

        {currentView === "otp" && (
          <motion.div
            key="otp"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full">
            <OtpVerification
              email={resetEmail}
              onBackToLogin={() => navigate("/sign-in")}
              onNavigateToChangePassword={(email, token) => {
                setResetEmail(email);
                setResetToken(token);
                navigate("/change-password", { state: { email, token } });
              }}
            />
          </motion.div>
        )}

        {currentView === "changePassword" && (
          <motion.div
            key="changePassword"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full">
            <ChangePassword
              email={resetEmail}
              resetToken={resetToken}
              onBackToLogin={() => navigate("/sign-in")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
