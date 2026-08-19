import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, User, Briefcase, GraduationCap, Wrench, Globe, Folder, Award, ChevronDown } from 'lucide-react';
import DashboardLayout from '../Components/dashboard/DashboardLayout';
import { useProfileLogic } from '../Hooks/useProfileLogic';

import ProfileBasicInfo from '../Components/profile/ProfileBasicInfo';
import ProfileExperience from '../Components/profile/ProfileExperience';
import ProfileEducation from '../Components/profile/ProfileEducation';
import ProfileSkills from '../Components/profile/ProfileSkills';
import ProfileProjects from '../Components/profile/ProfileProjects';
import ProfileLanguages from '../Components/profile/ProfileLanguages';
import ProfileCertifications from '../Components/profile/ProfileCertifications';

const ProfilePage = () => {
  const { profileData, loading, error, basicInfo, user } = useProfileLogic();
  const [activeTab, setActiveTab] = useState('basicInfo');

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 text-theme-red animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto py-12 text-center">
          <div className="bg-red-50 text-red-600 p-4 rounded-xl inline-block font-semibold border border-red-100 shadow-sm">
            Error loading profile: {error}
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Profile Overview</h1>
            <p className="text-slate-500 mt-2 text-lg font-medium">Manage your personal information and resume details.</p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            
            {/* Sidebar */}
            <div className="w-full md:w-[260px] flex-shrink-0 space-y-8">
              
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
                <h4 className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Resume Sections</h4>
                <div className="space-y-1">
                  {renderSidebarItem('basicInfo', 'Basic Info', User)}
                  {renderSidebarItem('experience', 'Experience', Briefcase)}
                  {renderSidebarItem('education', 'Education', GraduationCap)}
                  {renderSidebarItem('skills', 'Skills', Wrench)}
                  {renderSidebarItem('languages', 'Languages', Globe)}
                  {renderSidebarItem('projects', 'Projects', Folder)}
                  {renderSidebarItem('certifications', 'Certifications', Award)}
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
                  <div className="px-10 py-10">
                    {activeTab === 'basicInfo' && <ProfileBasicInfo data={basicInfo} />}
                    {activeTab === 'experience' && <ProfileExperience experience={profileData?.workExperiences} />}
                    {activeTab === 'education' && <ProfileEducation education={profileData?.educations} />}
                    {activeTab === 'skills' && <ProfileSkills skills={profileData?.skills} />}
                    {activeTab === 'languages' && <ProfileLanguages languages={profileData?.languages} />}
                    {activeTab === 'projects' && <ProfileProjects projects={profileData?.projects} />}
                    {activeTab === 'certifications' && <ProfileCertifications certifications={profileData?.certifications} />}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
