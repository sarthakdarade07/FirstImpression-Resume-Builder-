import React from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileEducation = ({ education }) => {
  if (!education || education.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)]"
    >
      <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
        <div className="p-2.5 bg-[var(--theme-red-start)]/10 rounded-xl border border-[var(--theme-red-start)]/20">
          <GraduationCap className="w-6 h-6 text-theme-red" />
        </div>
        <h3 className="text-2xl font-black text-gray-900 tracking-tight">Education</h3>
      </div>
      
      <div className="space-y-8">
        {education.map((edu, index) => (
          <div key={edu.id || index} className="relative pl-8 md:pl-0">
            {/* Timeline Line for Mobile */}
            <div className="md:hidden absolute left-[15px] top-6 bottom-[-24px] w-[2px] bg-dashed border-l-2 border-dashed border-gray-200 last:border-0"></div>
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 group">
              {/* Date Column */}
              <div className="md:w-48 shrink-0 md:text-right relative pt-1">
                {/* Timeline Dot for Mobile */}
                <div className="md:hidden absolute -left-[29px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[var(--theme-red-start)] shadow-sm group-hover:bg-[var(--theme-red-start)] transition-colors"></div>
                
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-theme-red bg-[var(--theme-red-start)]/10 px-3 py-1.5 rounded-lg border border-[var(--theme-red-start)]/20 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  {edu.startYear} - {edu.endYear || 'Present'}
                </span>
              </div>
              
              {/* Content Column */}
              <div className="flex-1 pb-8 md:pb-10 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="bg-white group-hover:bg-[var(--theme-red-start)]/5 p-5 rounded-2xl border border-transparent group-hover:border-[var(--theme-red-start)]/20 transition-all duration-300">
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-[var(--theme-red-start)] transition-colors">
                    {edu.educationType} {edu.specialization && <span className="text-gray-400 font-medium ml-1">in {edu.specialization}</span>}
                  </h4>
                  <p className="text-gray-500 font-semibold mt-1">{edu.instituteName}</p>
                  {edu.boardOrUniversity && (
                    <p className="text-gray-400 text-xs mt-1.5 uppercase tracking-wide font-bold">{edu.boardOrUniversity}</p>
                  )}
                  {edu.score && (
                    <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100/50">
                      <Award className="w-4 h-4" />
                      {edu.scoreType}: {edu.score}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProfileEducation;
