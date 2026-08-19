import { useState, useEffect } from 'react';
import { useUser } from '../Contexts/UserContext';

export const useProfileLogic = () => {
  const { user } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        const response = await fetch(`${API_BASE_URL}/api/profile/get-profile`, {
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

  // Combine auth user data with personal information if needed
  const basicInfo = {
    ...profileData?.authResponse,
    ...profileData?.personalInformation,
    // Prefer personalInformation name, fallback to user context, fallback to authResponse
    name: profileData?.personalInformation?.name || user?.name || profileData?.authResponse?.name
  };

  return {
    profileData,
    loading,
    error,
    basicInfo,
    user
  };
};
