import React from 'react';
import { Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileSkills = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)]"
    >
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
        <div className="p-2.5 bg-[var(--theme-red-start)]/10 rounded-xl border border-[var(--theme-red-start)]/20">
          <Sparkles className="w-6 h-6 text-theme-red" />
        </div>
        <h3 className="text-2xl font-black text-gray-900 tracking-tight">Skills</h3>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <div key={skill.id || index} className="group flex items-center gap-2 bg-gradient-to-r from-white to-[var(--theme-red-start)]/5 border border-gray-200 hover:border-[var(--theme-red-start)]/40 hover:shadow-md hover:shadow-theme-red/5 px-4 py-2 rounded-xl transition-all duration-300">
            <span className="font-bold text-gray-700 group-hover:text-theme-red transition-colors">{skill.title}</span>
            {skill.level && (
              <span className="flex items-center text-[11px] font-bold text-theme-red bg-[var(--theme-red-start)]/10 px-2 py-1 rounded-md border border-[var(--theme-red-start)]/20">
                <Star className="w-3 h-3 mr-1 text-theme-red fill-theme-red" />
                {skill.level}
              </span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProfileSkills;
