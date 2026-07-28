import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import OtpVerification from "./OtpVerification";
import ChangePassword from "./ChangePassword";
import SuccessToast from "../../Components/SuccessToast";

const AuthPage = () => {
  const [currentView, setCurrentView] = useState("login"); // login, signup, forgotPassword, otp, changePassword
  const [showToast, setShowToast] = useState(false);
  
  // State to pass between forgot password steps
  const [resetEmail, setResetEmail] = useState("");
  const [resetToken, setResetToken] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("verified") === "true") {
      setShowToast(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

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
              onNavigateToSignUp={() => setCurrentView("signup")}
              onNavigateToForgotPassword={() => setCurrentView("forgotPassword")}
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
            <SignUp onNavigateToLogin={() => setCurrentView("login")} />
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
              onBackToLogin={() => setCurrentView("login")}
              onNavigateToOtp={(email) => {
                setResetEmail(email);
                setCurrentView("otp");
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
              onBackToLogin={() => setCurrentView("login")}
              onNavigateToChangePassword={(email, token) => {
                setResetEmail(email);
                setResetToken(token);
                setCurrentView("changePassword");
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
              onBackToLogin={() => setCurrentView("login")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
