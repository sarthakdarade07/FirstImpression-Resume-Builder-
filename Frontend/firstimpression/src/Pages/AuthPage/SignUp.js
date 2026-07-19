import React, { useState } from "react";
import { UserPlus, EyeOff, LogIn, ChevronDown, Eye } from "lucide-react";
import SuccessToast from "../../Components/SuccessToast";
import FailedToast from "../../Components/FailedToast";
import mainImage from "../../Assets/promotional/loginpage.webp";
import icon_logo from "../../Assets/promotional/Firstimpression_icon_logo.webp";


const SignUp = ({ onNavigateToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    subscriptionPlan: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowToast(true);

        setFormData({
          name: "",
          email: "",
          password: "",
          subscriptionPlan: "Basic", 
        });
      } else {
        const error = await response.json();
        setErrorMsg(error.error);
      }
    } catch (error) {
       setErrorMsg("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-0 sm:p-6 lg:p-8 font-sans">
      <style>
        {`
          @keyframes slideInRight {
            from { transform: translateX(50px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .form-scroll::-webkit-scrollbar { width: 6px; }
          .form-scroll::-webkit-scrollbar-track { background: transparent; }
          .form-scroll::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
        `}
      </style>

      {/* Main Container */}
      <div className="w-full max-w-[1200px] flex flex-col-reverse md:flex-row sm:rounded-[2.5rem] overflow-hidden shadow-2xl relative bg-white md:h-[90vh]">
        {/* Left Side (Dark Section) - Image below on mobile */}
        <div className="w-full md:w-1/2 bg-[#282321] min-h-[300px] sm:min-h-[400px] md:min-h-0 flex flex-col relative overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 w-full h-full">
            <img
              src={mainImage}
              alt="App Dashboard"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>

        {/* Right Side (White Section) - Form on top on mobile */}
        <div
          className="w-full md:w-1/2 bg-white p-6 sm:p-8 md:p-12 overflow-y-auto form-scroll"
          style={{ animation: "slideInRight 0.6s ease-out forwards" }}>
          <div className="flex flex-col min-h-full justify-between gap-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 md:mb-0">
              {/* Logo */}
              <div className="flex items-center cursor-pointer">
                <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full border-[3px] sm:border-[3.5px] border-transparent shrink-0">
                  <img
                    src={icon_logo}
                    className="h-full w-full justify-center "
                  />
                </div>
                <span className="text-xl sm:text-[1.35rem] font-bold tracking-tight text-gray-900">
                  firstimpression
                </span>
              </div>

              {/* Back to Login Link */}
              <button
                onClick={onNavigateToLogin}
                className="flex items-center gap-1.5 sm:gap-2 text-gray-600 hover:text-[#FF5A00] font-medium transition-colors text-xs sm:text-sm">
                <LogIn size={18} strokeWidth={1.5} />
                Sign In
              </button>
            </div>

            {/* Sign Up Form */}
            <div className="max-w-[420px] w-full mx-auto flex-grow flex flex-col justify-center py-8 md:py-0">
              <h2 className="text-3xl sm:text-[2.75rem] font-medium text-gray-900 mb-8 sm:mb-10 tracking-tight text-center md:text-left">
                Create Account
              </h2>

              <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                {/* Name Input */}
                <div>
                  <input
                    type="text"
                    name="name"
                    required
                    minLength={2}
                    maxLength={15}
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 sm:px-6 py-3.5 sm:py-4 rounded-full border border-gray-300 focus:outline-none focus:border-[#FF5A00] focus:ring-1 focus:ring-[#FF5A00] transition-colors placeholder-gray-500 text-gray-900 text-sm sm:text-[15px]"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 sm:px-6 py-3.5 sm:py-4 rounded-full border border-gray-300 focus:outline-none focus:border-[#FF5A00] focus:ring-1 focus:ring-[#FF5A00] transition-colors placeholder-gray-500 text-gray-900 text-sm sm:text-[15px]"
                  />
                </div>

                {/* Password Input */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    minLength={6}
                    maxLength={20}
                    placeholder="Password (6-20 characters)"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-5 sm:px-6 py-3.5 sm:py-4 rounded-full border border-gray-300 focus:outline-none focus:border-[#FF5A00] focus:ring-1 focus:ring-[#FF5A00] transition-colors placeholder-gray-500 text-gray-900 text-sm sm:text-[15px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 sm:right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF5A00] transition-colors">
                    {showPassword ? (
                      <Eye
                        size={20}
                        strokeWidth={1.5}
                        className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]"
                      />
                    ) : (
                      <EyeOff
                        size={20}
                        strokeWidth={1.5}
                        className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]"
                      />
                    )}
                  </button>
                </div>

                {/* Subscription Plan Dropdown */}
                <div className="relative">
                  <select
                    name="subscriptionPlan"
                    defaultValue="Basic"
                    value={formData.subscriptionPlan}
                    onChange={handleChange}
                    className="w-full px-5 sm:px-6 py-3.5 sm:py-4 rounded-full border border-gray-300 focus:outline-none focus:border-[#FF5A00] focus:ring-1 focus:ring-[#FF5A00] transition-colors text-gray-900 text-sm sm:text-[15px] appearance-none bg-white cursor-pointer">
                    <option value="Basic">Basic Plan</option>
                    <option value="Pro">Pro Plan</option>
                    <option value="Premium">Premium Plan</option>
                  </select>
                  {/* Custom chevron to replace the ugly default browser dropdown arrow */}
                  <div className="absolute right-5 sm:right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <ChevronDown
                      size={20}
                      strokeWidth={1.5}
                      className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]"
                    />
                  </div>
                </div>

                {/* Sign Up Button */}
                <button
                  type="submit"
                  className="w-full mt-6 bg-gradient-to-r from-[#FF4E00] to-[#E92B65] hover:opacity-90 text-white font-medium text-sm sm:text-[15px] py-4 sm:py-[18px] px-6 rounded-full flex items-center justify-center gap-2 transition-all shadow-lg shadow-pink-500/20 transform hover:-translate-y-[1px]">
                  <UserPlus size={18} strokeWidth={2} />
                  Create Account
                </button>
              </form>

              {/* Only render if successMsg */}

              {showToast && (
                <SuccessToast
                  message="Account created successfully!"
                  onClose={() => setShowToast(false)}
                />
              )}

              {/*  if errorMsg */}
              {errorMsg && (
                <FailedToast
                  message={errorMsg}
                  onClose={() => setErrorMsg("")}
                />
              )}
            </div>

            {/* Footer */}
            <div className="flex flex-col-reverse md:flex-row justify-between items-center text-[10px] sm:text-[11px] text-gray-400 font-medium gap-4 md:gap-0 mt-8 md:mt-0">
              <p>© 2005-2025 firstimpression Inc.</p>
              <div className="flex items-center gap-4 sm:gap-6">
                <a
                  href="#"
                  className="hover:text-gray-600 transition-colors cursor-pointer">
                  Terms of Service
                </a>
                <button className="flex items-center gap-1 hover:text-gray-600 transition-colors cursor-pointer">
                  English <ChevronDown size={14} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
