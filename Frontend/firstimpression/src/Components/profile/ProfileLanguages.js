import React from 'react';
import { Languages } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileLanguages = ({ languages }) => {
  if (!languages || languages.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)]"
    >
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
        <div className="p-2.5 bg-[var(--theme-red-start)]/10 rounded-xl border border-[var(--theme-red-start)]/20">
          <Languages className="w-6 h-6 text-theme-red" />
        </div>
        <h3 className="text-2xl font-black text-gray-900 tracking-tight">Languages</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {languages.map((lang, index) => (
          <div key={lang.id || index} className="flex flex-col p-4 rounded-xl border border-gray-100 bg-gradient-to-br from-white to-[var(--theme-red-start)]/5 hover:shadow-md hover:border-[var(--theme-red-start)]/30 transition-all">
            <span className="font-bold text-gray-900 text-lg mb-1">{lang.language}</span>
            {lang.level && (
              <span className="text-xs font-bold text-theme-red uppercase tracking-wider">{lang.level}</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProfileLanguages;
