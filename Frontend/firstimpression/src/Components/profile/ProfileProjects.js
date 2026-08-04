import React from 'react';
import { FolderGit2, Calendar, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileProjects = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

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
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
        <div className="p-2.5 bg-[var(--theme-red-start)]/10 rounded-xl border border-[var(--theme-red-start)]/20">
          <FolderGit2 className="w-6 h-6 text-theme-red" />
        </div>
        <h3 className="text-2xl font-black text-gray-900 tracking-tight">Projects</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div key={project.id || index} className="group flex flex-col p-6 rounded-[1.5rem] border border-gray-200 bg-white hover:shadow-xl hover:shadow-theme-red/5 hover:border-[var(--theme-red-start)]/30 transition-all duration-300">
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-xl font-bold text-gray-900 group-hover:text-theme-red transition-colors line-clamp-1">{project.title}</h4>
              {project.projectLink && (
                <a href={project.projectLink} target="_blank" rel="noreferrer" className="p-1.5 text-gray-400 hover:text-theme-red hover:bg-[var(--theme-red-start)]/10 rounded-lg transition-colors shrink-0 border border-transparent hover:border-[var(--theme-red-start)]/20">
                  <LinkIcon className="w-4 h-4" />
                </a>
              )}
            </div>
            
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-theme-red uppercase tracking-wider mb-4 bg-[var(--theme-red-start)]/10 w-fit px-2 py-1 rounded-md border border-[var(--theme-red-start)]/20">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : 'Present'}
            </div>
            
            {project.description && (
              <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-1 leading-relaxed">{project.description}</p>
            )}
            
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-auto pt-5 border-t border-gray-100">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="text-[11px] font-bold text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-200 group-hover:border-theme-red/20 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProfileProjects;
