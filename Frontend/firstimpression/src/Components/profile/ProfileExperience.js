import React from 'react';
import { Briefcase, Calendar, MapPin, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileExperience = ({ experience }) => {
  if (!experience || experience.length === 0) return null;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)]"
    >
      <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
        <div className="p-2.5 bg-[var(--theme-red-start)]/10 rounded-xl border border-[var(--theme-red-start)]/20">
          <Briefcase className="w-6 h-6 text-theme-red" />
        </div>
        <h3 className="text-2xl font-black text-gray-900 tracking-tight">Experience</h3>
      </div>
      
      <div className="space-y-8">
        {experience.map((exp, index) => (
          <div key={exp.id || index} className="relative pl-8 md:pl-0">
            {/* Timeline Line for Mobile */}
            <div className="md:hidden absolute left-[15px] top-6 bottom-[-24px] w-[2px] bg-dashed border-l-2 border-dashed border-gray-200 last:border-0"></div>
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 group">
              {/* Date Column */}
              <div className="md:w-48 shrink-0 md:text-right relative pt-1">
                {/* Timeline Dot for Mobile */}
                <div className="md:hidden absolute -left-[29px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[var(--theme-red-start)] shadow-sm group-hover:bg-[var(--theme-red-start)] transition-colors"></div>
                
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-theme-red bg-[var(--theme-red-start)]/10 px-3 py-1.5 rounded-lg border border-[var(--theme-red-start)]/20 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(exp.joinDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                </span>
                
                {exp.location && (
                  <div className="mt-2 text-xs font-medium text-gray-400 flex items-center md:justify-end gap-1">
                    <MapPin className="w-3 h-3" />
                    {exp.location}
                  </div>
                )}
              </div>
              
              {/* Content Column */}
              <div className="flex-1 pb-8 md:pb-10 border-b border-gray-100 last:border-0 last:pb-0 relative">
                {/* Desktop timeline elements if you want a center line, but right now it's side-by-side */}
                
                <div className="bg-white group-hover:bg-[var(--theme-red-start)]/5 p-5 rounded-2xl border border-transparent group-hover:border-[var(--theme-red-start)]/20 transition-all duration-300">
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-[var(--theme-red-start)] transition-colors">
                    {exp.jobTitle}
                  </h4>
                  <p className="text-gray-500 font-semibold mb-3">{exp.companyName}</p>
                  
                  {exp.description && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 whitespace-pre-wrap">{exp.description}</p>
                  )}
                  
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="inline-flex items-center gap-1 text-[11px] font-bold text-theme-red bg-[var(--theme-red-start)]/10 px-2.5 py-1 rounded-md border border-[var(--theme-red-start)]/20">
                          <Code2 className="w-3 h-3 text-theme-red" />
                          {tech}
                        </span>
                      ))}
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

export default ProfileExperience;
