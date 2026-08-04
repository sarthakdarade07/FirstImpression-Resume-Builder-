import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../Components/dashboard/DashboardLayout';
import { useUser } from '../Contexts/UserContext';

import ProfileBasicInfo from '../Components/profile/ProfileBasicInfo';
import ProfileExperience from '../Components/profile/ProfileExperience';
import ProfileEducation from '../Components/profile/ProfileEducation';
import ProfileSkills from '../Components/profile/ProfileSkills';
import ProfileProjects from '../Components/profile/ProfileProjects';
import ProfileLanguages from '../Components/profile/ProfileLanguages';
import ProfileCertifications from '../Components/profile/ProfileCertifications';

const ProfilePage = () => {
  const { user } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/api/auth/get-profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        
        // Extract from "message" wrapper if it exists
        setProfileData(data.message || data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [API_BASE_URL]);

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

  // Combine auth user data with personal information if needed
  const basicInfo = {
    ...profileData?.authResponse,
    ...profileData?.personalInformation,
    // Prefer personalInformation name, fallback to user context, fallback to authResponse
    name: profileData?.personalInformation?.name || user?.name || profileData?.authResponse?.name
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-16 pt-4">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Profile</h1>
          <p className="text-gray-500 mt-2 text-lg">Manage your personal information and resume details.</p>
        </motion.div>

        {/* Profile Sections */}
        <div className="space-y-8">
          <ProfileBasicInfo data={basicInfo} />
          
          <ProfileExperience experience={profileData?.workExperiences} />
          
          <ProfileEducation education={profileData?.educations} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProfileSkills skills={profileData?.skills} />
            <ProfileLanguages languages={profileData?.languages} />
          </div>
          
          <ProfileProjects projects={profileData?.projects} />
          
          <ProfileCertifications certifications={profileData?.certifications} />
        </div>

      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
