import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = ({ isSplashFinished = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Change state if scrolled down more than 20px
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={false}
      animate={isSplashFinished ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
      transition={{ duration: 0.8, delay: isSplashFinished ? 0.3 : 0, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 h-24 flex items-center justify-between">
        
        {/* Left Logo Area - Left empty because SplashScreen.js lands exactly here! */}
        <div className="w-[200px]"></div>

        {/* Middle Links */}
        <div className="hidden md:flex items-center gap-10 font-medium text-[15px] text-gray-700">
          <a href="#work" className="hover:text-[var(--theme-red-hover)] transition-colors">
            Templates
          </a>
          <a href="#about" className="hover:text-[var(--theme-red-hover)] transition-colors">
            Features
          </a>
          <a href="#playground" className="hover:text-[var(--theme-red-hover)] transition-colors">
            Examples
          </a>
          <a href="#resource" className="hover:text-[var(--theme-red-hover)] transition-colors">
            Pricing
          </a>
        </div>

        {/* Right Button */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-gray-700 font-medium hover:text-[var(--theme-red-hover)] transition-colors">
            Log in
          </button>
          <button
            className={`
            h-11 px-6 rounded-full font-semibold flex items-center justify-center shrink-0 transition-all duration-300
            ${
              isScrolled
                ? "bg-gradient-to-r from-[var(--theme-red-start)] to-[var(--theme-red-end)] text-white hover:shadow-md hover:-translate-y-0.5"
                : "bg-gray-900 text-white hover:bg-gray-800 hover:-translate-y-0.5"
            }
          `}>
            Get Started
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
