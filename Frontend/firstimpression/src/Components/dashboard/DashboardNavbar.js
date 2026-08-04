import React, { useEffect, useState } from 'react';
import { Bell, Search, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import UserMenu from './UserMenu';
import logo from "../../Assets/promotional/Firstimpression_icon_logo_copy.png"; 
import { useUser } from '../../Contexts/UserContext';

const tabs = ['My Resumes', 'Templates', 'ATS Score'];

const DashboardNavbar = ({ activeTab = 'My Resumes', setActiveTab }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
  const {user }= useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (tab) => {
    if (location.pathname !== '/dashboard') {
      navigate('/dashboard', { state: { activeTab: tab } });
    } else {
      if (setActiveTab) setActiveTab(tab);
    }
  };

  return (
    <> 
      <nav 
        className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-30 shadow-sm"
        style={{ 
          paddingLeft: 'var(--auth-form-padding)', 
          paddingRight: 'var(--auth-form-padding)',
        }}
      >
        <div className="flex justify-between items-center h-20">
          
          {/* Left Side: Logo & Tabs */}
          <div className="flex items-center gap-6 lg:gap-10">
            <div className="flex items-center gap-3 md:gap-4">
              {location.pathname !== '/dashboard' && (
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="p-1.5 md:p-2 bg-gray-50 rounded-xl border border-gray-100 text-gray-500 hover:text-[var(--theme-red-start)] hover:border-[var(--theme-red-start)]/30 hover:bg-[var(--theme-red-start)]/10 transition-all shadow-sm flex items-center justify-center shrink-0"
                  title="Back to Dashboard"
                >
                  <ArrowLeft className="w-5 h-5 md:w-5 md:h-5" strokeWidth={2.5} />
                </button>
              )}
              <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/dashboard')}>
              <img 
                 src = {logo}
                alt="FirstImpression Logo" 
                className="h-8 sm:h-10 object-contain drop-shadow-sm mr-3" 
              />
              <div className="hidden sm:flex items-center font-bold tracking-tight text-gray-900 text-xl sm:text-3xl">
                <span className="text-[var(--theme-red-start)]">first</span>
                <span className="ml-0.5">impression</span>
              </div>
              </div>
            </div>

            {/* Desktop Tab Slider */}
            <div className="hidden md:flex items-center bg-gray-50/80 p-1 rounded-full border border-gray-100/50">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`relative px-5 py-2 text-sm font-medium rounded-full transition-colors ${
                    activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="nav-tab-slider"
                      className="absolute inset-0 bg-theme-red rounded-full shadow-md"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Icons & Profile */}
          <div className="flex items-center gap-3 sm:gap-4">
             {/* Simple Search */}
             <button className="p-2 text-gray-400 hover:text-theme-red transition-colors rounded-full hover:bg-gray-50">
               <Search className="w-5 h-5" />
             </button>

             <button className="relative p-2 text-gray-400 hover:text-theme-red transition-colors rounded-full hover:bg-gray-50">
               <Bell className="w-5 h-5" />
               <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-theme-red rounded-full"></span>
             </button>

            <div className="hidden sm:block w-px h-6 bg-gray-200 mx-1"></div>

            {/* Clean User Profile Trigger */}
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUserMenuOpen(prev => !prev);
                }}
                className="flex items-center gap-2 p-1 rounded-full hover:ring-4 ring-theme-red-start/10 transition-all duration-200 active:scale-95 focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-theme-red-start to-theme-red-end flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  {user.name ? (user.name ? user.name.charAt(0).toUpperCase() : 'U') : '...'}
                </div>
              </button>
               
              {/* Dropdown User Menu */}
              <UserMenu isOpen={isUserMenuOpen} onClose={() => setIsUserMenuOpen(false)}  />
            </div>
          </div>
        </div>

        {/* Mobile Tab Slider (Visible only on small screens) */}
        <div className="md:hidden flex overflow-x-auto pb-4 hide-scrollbar gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeTab === tab ? 'bg-theme-red text-white' : 'bg-gray-50 text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default DashboardNavbar;
