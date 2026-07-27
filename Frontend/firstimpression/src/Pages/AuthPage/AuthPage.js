import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./Login";
import SignUp from "./SignUp";
import SuccessToast from "../../Components/SuccessToast";

const AuthPage = () => {
  const [currentView, setCurrentView] = useState("login");
  const [showToast, setShowToast] = useState(false);

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
        {currentView === "login" ? (
          <motion.div
            key="login"
            // The animation states:
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full">
            <Login onNavigateToSignUp={() => setCurrentView("signup")} />
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            // The animation states:
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full">
            <SignUp onNavigateToLogin={() => setCurrentView("login")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
