import React, { useState, useEffect } from "react";

const Navbar = () => {
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
    <nav className="h-8">
      <div
        className={`
        fixed top-6 left-1/2 -translate-x-1/2 z-50 
        flex items-center justify-between p-2 
        rounded-full transition-all duration-500 ease-in-out shadow-2xl
        w-[95%] max-w-[850px]
        ${
          isScrolled
            ? "bg-white text-red-600 dark:bg-[#1a1a1a] dark:text-white"
            : "bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-white/10 text-gray-900 dark:text-white"
        }
      `}>
        {/* Left Planet Icon */}
        <div
          className={`
          w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500
          ${
            isScrolled
              ? "bg-red-600 text-white dark:bg-white dark:text-black"
              : "bg-white text-black"
          }
        `}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="12" cy="12" r="6" />
            <ellipse
              cx="12"
              cy="12"
              rx="10"
              ry="3"
              transform="rotate(-45 12 12)"
            />
          </svg>
        </div>

        {/* Middle Links */}
        <div className="hidden md:flex items-center gap-10 font-medium text-[15px]">
          <a href="#work" className="hover:opacity-70 transition-opacity">
            Work
          </a>
          <a href="#about" className="hover:opacity-70 transition-opacity">
            About
          </a>
          <a href="#playground" className="hover:opacity-70 transition-opacity">
            Playground
          </a>
          <a href="#resource" className="hover:opacity-70 transition-opacity">
            Resource
          </a>
        </div>

        {/* Right Button */}
        <button
          className={`
          h-12 px-6 rounded-full font-medium flex items-center justify-center shrink-0 transition-colors duration-500
          ${
            isScrolled
              ? "bg-red-600 text-white hover:bg-red-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              : "bg-white text-black hover:bg-gray-100"
          }
        `}>
          Copy email address
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
