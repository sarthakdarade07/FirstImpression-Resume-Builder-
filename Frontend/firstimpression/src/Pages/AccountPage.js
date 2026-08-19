import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, Key, Eye, EyeOff, Loader2, CheckCircle2, ArrowRight, Settings, Code, Lock, ArrowUpCircle, CreditCard, FileText, ChevronDown } from 'lucide-react';
import { useUser } from '../Contexts/UserContext';
import DashboardLayout from '../Components/dashboard/DashboardLayout';
import SuccessToast from '../Components/Notifications/SuccessToast';
import FailedToast from '../Components/Notifications/FailedToast';

const AccountPage = () => {
  const { user, setUser } = useUser();
  const API_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

  const [activeTab, setActiveTab] = useState('general');

  // Multi-step state: 1 = Initial (Reset Button), 2 = Enter OTP, 3 = Enter New Password
  const [step, setStep] = useState(1);
  const [resetToken, setResetToken] = useState("");
  
  // Form values
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI states
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [msg, setMsg] = useState('');

  const inputRefs = useRef([]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Frontend has to share multipart file
    const formData = new FormData();
    formData.append("image", file); // Must match @RequestPart("image")

    setIsLoading(true);
    try {
      // Call the actual backend API endpoint
      var token = localStorage.getItem('jwtToken');
      const response = await fetch(`${API_BASE_URL}/api/auth/upload-image`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },

        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.error || "Failed to upload profile image");
      }

      // Update local context with the URL returned by your backend
      setUser({ ...user, profileImageUrl: data.image_url });
      
      setIsSuccess(true);
      setMsg("Profile photo updated successfully!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setIsSuccess(false);
      setMsg(err.message);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveImage = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`${API_BASE_URL}/api/auth/remove-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to remove profile image");
      }

      setUser({ ...user, profileImageUrl: null });
      
      setIsSuccess(true);
      setMsg("Profile photo removed successfully!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setIsSuccess(false);
      setMsg(err.message);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 1: Request OTP
  const handleRequestReset = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to send OTP");
      }
      setIsSuccess(true);
      setMsg(data.message || "OTP sent to your email!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setStep(2);
    } catch (err) {
      setIsSuccess(false);
      setMsg(err.message);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setIsSuccess(false);
      setMsg("Please enter the 6-digit OTP.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    
    setIsLoading(true); 
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, otp: otpValue }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Invalid or expired OTP");
      }
      setResetToken(data.response.resetToken);
      setIsSuccess(true);
      setMsg(data.message || "OTP verified successfully!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setStep(3);
    } catch (err) {
      setIsSuccess(false);
      setMsg(err.message);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setIsSuccess(false);
      setMsg("New passwords do not match.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    if (newPassword.length < 6) {
      setIsSuccess(false);
      setMsg("Password must be at least 6 characters long.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetToken, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to reset password");
      }
      setIsSuccess(true);
      setMsg(data.message || "Password successfully updated!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      
      // Reset state
      setStep(1);
      setOtp(new Array(6).fill(""));
      setNewPassword('');
      setConfirmPassword('');
      setResetToken("");
    } catch (err) {
      setIsSuccess(false);
      setMsg(err.message);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleVerifyOtp(e);
    }
  };

  // Helper for split name
  const firstName = user?.name ? user.name.split(' ')[0] : 'Guest';
  const lastName = user?.name && user.name.split(' ').length > 1 ? user.name.split(' ').slice(1).join(' ') : '';

  const renderSidebarItem = (id, label, Icon) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-6 py-2.5.5 rounded-xl transition-all duration-200 text-[15px] font-medium ${
        activeTab === id 
          ? 'bg-white text-gray-900 shadow-sm border border-gray-200/50' 
          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'
      }`}
    >
      <Icon size={18} className={activeTab === id ? 'text-[var(--theme-red)]' : 'text-gray-400'} />
      {label}
    </button>
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            
            {/* Sidebar */}
            <div className="w-full md:w-[260px] flex-shrink-0 space-y-10">
              
              {/* Profile Dropdown Simulation */}
              <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-2xl shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--theme-red-start)] to-[var(--theme-red-end)] flex items-center justify-center text-white font-bold text-sm overflow-hidden shadow-sm">
                    {user?.profileImageUrl ? (
                      <img src={user.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={18} />
                    )}
                  </div>
                  <span className="font-bold text-gray-900 text-[15px]">{user?.name || 'Guest User'}</span>
                </div>
                <ChevronDown size={18} className="text-gray-400" />
              </div>

              {/* Navigation Sections */}
              <div>
                <h4 className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">General</h4>
                <div className="space-y-1">
                  {renderSidebarItem('general', 'General', Settings)}
                  {renderSidebarItem('preferences', 'Preferences', Settings)}
                  {renderSidebarItem('developers', 'Developers', Code)}
                  {renderSidebarItem('security', 'Security', Lock)}
                </div>
              </div>

              <div>
                <h4 className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Developers</h4>
                <div className="space-y-1">
                  {renderSidebarItem('upgrade', 'Upgrade', ArrowUpCircle)}
                  {renderSidebarItem('plan', 'Your plan', CreditCard)}
                  {renderSidebarItem('invoices', 'Invoices', FileText)}
                  {renderSidebarItem('billing', 'Billing details', CreditCard)}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-[24px] border border-gray-200 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden min-h-[500px]"
                >
                  
                  {/* Tab: General */}
                  {activeTab === 'general' && (
                    <div className="px-10 py-10">
                      <h2 className="text-[1.7rem] font-bold text-gray-900 mb-8 tracking-tight">General</h2>
                      
                      <div className="space-y-8 max-w-3xl">
                        
                        {/* Profile Photo */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                           <div className="w-24 h-24 rounded-[32px] bg-[#222] flex items-center justify-center text-white text-2xl font-medium shadow-md overflow-hidden flex-shrink-0">
                            {user?.profileImageUrl ? (
                              <img src={user.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                              user?.name ? user.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase() : 'SE'
                            )}
                          </div>
                          <div>
                            <h4 className="text-gray-900 font-bold mb-1">Profile photo</h4>
                            <p className="text-sm text-gray-500 mb-4">We support PNGs, JPEGs and GIFs under 10MB</p>
                            <div className="flex flex-wrap gap-3">
                              <label className="cursor-pointer inline-flex items-center justify-center px-6 py-2.5 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-500 shadow-sm">
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  className="hidden" 
                                  onChange={handleImageUpload} 
                                  disabled={isLoading}
                                />
                                {isLoading ? 'Uploading...' : 'Upload new picture'}
                              </label>
                              {user?.profileImageUrl && (
                                <button 
                                  onClick={handleRemoveImage}
                                  disabled={isLoading}
                                  className="inline-flex items-center justify-center px-6 py-2.5 bg-red-50 border border-red-200 text-red-600 rounded-full hover:bg-red-100 transition-colors text-sm font-semibold disabled:opacity-70"
                                >
                                  {isLoading ? 'Removing...' : 'Remove photo'}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* First Name & Last Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                          <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">First name</label>
                            <input 
                              type="text" 
                              value={firstName}
                              readOnly
                              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">Last name</label>
                            <input 
                              type="text" 
                              value={lastName}
                              readOnly
                              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div className="pt-2">
                          <label className="block text-sm font-bold text-gray-900 mb-2">Email</label>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <span className="text-gray-500 text-[15px]">{user?.email || 'guest@example.com'}</span>
                            <div className="flex items-center gap-3">
                              <button className="px-6 py-2.5 bg-[#FF7A59] text-white text-sm font-bold rounded-full hover:bg-[#ff6a45] transition-colors shadow-sm">
                                Verify
                              </button>
                              <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-500 text-sm font-bold rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                                Update
                              </button>
                            </div>
                          </div>
                        </div>

                        <hr className="border-gray-100 my-8" />

                        {/* Phone */}
                        <div>
                          <label className="block text-sm font-bold text-gray-900 mb-2">Phone</label>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <span className="text-gray-500 text-[15px]">No phone number</span>
                            <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-500 text-sm font-bold rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                              Add phone number
                            </button>
                          </div>
                        </div>

                        <hr className="border-gray-100 my-8" />

                        {/* Deactivate Account */}
                        <div className="pb-4">
                          <label className="block text-sm font-bold text-gray-900 mb-2">Deactivate account</label>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <span className="text-gray-500 text-[15px]">This will remove you from all workspaces</span>
                            <button className="px-6 py-2.5 bg-[#FF4747] text-white text-sm font-bold rounded-full hover:bg-red-600 transition-colors shadow-sm shadow-red-200/50">
                              Deactivate account
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* Tab: Security (Password Reset) */}
                  {activeTab === 'security' && (
                    <div className="px-10 py-10">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="p-2.5 bg-gray-50 rounded-2xl border border-gray-200">
                          <Shield className="w-6 h-6 text-[var(--theme-red)]" />
                        </div>
                        <h2 className="text-[1.7rem] font-bold text-gray-900 tracking-tight">Security</h2>
                      </div>
                      
                      <div className="max-w-xl">
                        {step === 1 && (
                          <div>
                            <p className="text-gray-500 font-medium mb-6">
                              To ensure security, we will send a 6-digit OTP to your registered email address before allowing you to reset your password.
                            </p>
                            <button 
                              onClick={handleRequestReset}
                              disabled={isLoading}
                              className="w-full md:w-auto px-6 py-2.5 bg-gradient-to-r from-[var(--theme-red-start)] to-[var(--theme-red-end)] text-white font-bold rounded-xl hover:shadow-[0_8px_20px_rgba(255,78,0,0.3)] transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                            >
                              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Shield className="w-5 h-5" />}
                              {isLoading ? 'Sending OTP...' : 'Reset Password'}
                            </button>
                          </div>
                        )}

                        {step === 2 && (
                          <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <div>
                              <label className="block text-sm font-bold text-gray-500 mb-3">Enter 6-Digit OTP</label>
                              <div className="flex gap-2 sm:gap-3">
                                {otp.map((data, index) => (
                                  <input
                                    className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold bg-white border border-gray-300 rounded-xl focus:border-[var(--theme-red-start)] focus:ring-2 focus:ring-[var(--theme-red-start)] outline-none transition-all"
                                    type="text"
                                    name="otp"
                                    maxLength="1"
                                    key={index}
                                    value={data}
                                    onChange={(e) => handleOtpChange(e.target, index)}
                                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                  />
                                ))}
                              </div>
                            </div>
                            <button 
                              type="submit" 
                              disabled={isLoading}
                              className="w-full md:w-auto px-6 py-2.5 bg-gradient-to-r from-[var(--theme-red-start)] to-[var(--theme-red-end)] text-white font-bold rounded-xl hover:shadow-[0_8px_20px_rgba(255,78,0,0.3)] transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                            >
                              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                              {isLoading ? 'Verifying...' : 'Verify OTP'}
                            </button>
                          </form>
                        )}

                        {step === 3 && (
                          <form onSubmit={handleChangePassword} className="space-y-5">
                            {/* New Password */}
                            <div>
                              <label className="block text-sm font-bold text-gray-500 mb-2">New Password</label>
                              <div className="relative flex items-center">
                                <Key className="w-5 h-5 text-gray-400 absolute left-4" />
                                <input 
                                  type={showNew ? "text" : "password"} 
                                  value={newPassword}
                                  onChange={(e) => setNewPassword(e.target.value)}
                                  required
                                  placeholder="Enter new password"
                                  className="w-full bg-white border border-gray-300 rounded-xl py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] focus:border-transparent transition-all font-medium"
                                />
                                <button 
                                  type="button" 
                                  onClick={() => setShowNew(!showNew)}
                                  className="absolute right-4 text-gray-400 hover:text-gray-500 transition-colors"
                                >
                                  {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                              </div>
                            </div>

                            {/* Confirm New Password */}
                            <div>
                              <label className="block text-sm font-bold text-gray-500 mb-2">Confirm New Password</label>
                              <div className="relative flex items-center">
                                <Key className="w-5 h-5 text-gray-400 absolute left-4" />
                                <input 
                                  type={showConfirm ? "text" : "password"} 
                                  value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                  required
                                  placeholder="Confirm new password"
                                  className="w-full bg-white border border-gray-300 rounded-xl py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] focus:border-transparent transition-all font-medium"
                                />
                                <button 
                                  type="button" 
                                  onClick={() => setShowConfirm(!showConfirm)}
                                  className="absolute right-4 text-gray-400 hover:text-gray-500 transition-colors"
                                >
                                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                              </div>
                            </div>

                            <div className="pt-4">
                              <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full md:w-auto px-6 py-2.5 bg-gradient-to-r from-[var(--theme-red-start)] to-[var(--theme-red-end)] text-white font-bold rounded-xl hover:shadow-[0_8px_20px_rgba(255,78,0,0.3)] transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                              >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                                {isLoading ? 'Updating...' : 'Update Password'}
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Fallback for other tabs */}
                  {['preferences', 'developers', 'upgrade', 'plan', 'invoices', 'billing'].includes(activeTab) && (
                     <div className="p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-center mb-4 text-gray-400">
                          <Settings size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize">{activeTab.replace('-', ' ')}</h3>
                        <p className="text-gray-500">This section is currently under construction.</p>
                     </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
      
      {showToast && (
        <div className="fixed bottom-10 right-10 z-50">
          {isSuccess ? <SuccessToast message={msg} /> : <FailedToast message={msg} />}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AccountPage;
