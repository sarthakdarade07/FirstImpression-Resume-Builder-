import React from 'react';
import { Mail, Phone, MapPin, Briefcase, Code2, Users, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileBasicInfo = ({ data }) => {
  if (!data) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] overflow-hidden"
    >
      {/* Cover Banner */}
      <div className="h-32 md:h-48 bg-gradient-to-r from-[var(--theme-red-start)] to-[var(--theme-red-end)] relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      <div className="px-6 md:px-10 pb-8 relative -mt-16 md:-mt-20">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          
          {/* Profile Photo */}
          <div className="shrink-0 relative z-10">
            {data.photoUrl ? (
              <img 
                src={data.photoUrl} 
                alt={data.name} 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-xl border-4 border-white bg-white"
              />
            ) : (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-theme-red-start to-theme-red-end flex items-center justify-center text-white text-5xl font-bold shadow-xl border-4 border-white">
                {data.name ? data.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-sm"></div>
          </div>

          {/* Basic Details */}
          <div className="flex-1 pt-2 md:pt-24 space-y-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">{data.name || 'Your Name'}</h2>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-gray-600 font-medium">
                {data.role && (
                  <span className="flex items-center gap-1.5 bg-[var(--theme-red-start)]/10 px-3.5 py-1.5 rounded-full text-sm border border-[var(--theme-red-start)]/20 text-theme-red shadow-sm">
                    <Briefcase className="w-4 h-4 text-theme-red" />
                    {data.role}
                  </span>
                )}
                {data.location && (
                  <span className="flex items-center gap-1.5 bg-[var(--theme-red-start)]/10 px-3.5 py-1.5 rounded-full text-sm border border-[var(--theme-red-start)]/20 text-theme-red shadow-sm">
                    <MapPin className="w-4 h-4 text-theme-red" />
                    {data.location}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2 text-sm text-gray-600 font-medium">
              {data.email && (
                <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-theme-red transition-colors group">
                  <div className="p-1.5 rounded-lg bg-gray-50 group-hover:bg-theme-red/10 transition-colors border border-gray-100">
                    <Mail className="w-4 h-4 text-gray-400 group-hover:text-theme-red" />
                  </div>
                  {data.email}
                </a>
              )}
              {data.phoneNo && (
                <a href={`tel:${data.phoneNo}`} className="flex items-center gap-2 hover:text-theme-red transition-colors group">
                  <div className="p-1.5 rounded-lg bg-gray-50 group-hover:bg-theme-red/10 transition-colors border border-gray-100">
                    <Phone className="w-4 h-4 text-gray-400 group-hover:text-theme-red" />
                  </div>
                  {data.phoneNo}
                </a>
              )}
            </div>
          </div>
          
          {/* Social Links aligned right */}
          <div className="flex flex-row md:flex-col gap-3 pt-4 md:pt-24 md:ml-auto w-full md:w-auto border-t border-gray-100 md:border-0 mt-4 md:mt-0">
            {data.linkedinUrl && (
              <a href={data.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center p-3 rounded-xl bg-[#0A66C2]/5 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors border border-[#0A66C2]/20 shadow-sm" title="LinkedIn">
                <Users className="w-5 h-5" />
              </a>
            )}
            {data.githubUrl && (
              <a href={data.githubUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center p-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-800 hover:text-white transition-colors border border-gray-200 shadow-sm" title="GitHub">
                <Code2 className="w-5 h-5" />
              </a>
            )}
            {data.portfolioUrl && (
              <a href={data.portfolioUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center p-3 rounded-xl bg-[var(--theme-red-start)]/5 text-theme-red hover:bg-gradient-to-r hover:from-[var(--theme-red-start)] hover:to-[var(--theme-red-end)] hover:text-white transition-all border border-[var(--theme-red-start)]/20 shadow-sm" title="Portfolio">
                <Globe className="w-5 h-5" />
              </a>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default ProfileBasicInfo;
