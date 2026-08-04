import React from 'react';
import { Award, Calendar, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileCertifications = ({ certifications }) => {
  if (!certifications || certifications.length === 0) return null;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)]"
    >
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
        <div className="p-2.5 bg-[var(--theme-red-start)]/10 rounded-xl border border-[var(--theme-red-start)]/20">
          <Award className="w-6 h-6 text-theme-red" />
        </div>
        <h3 className="text-2xl font-black text-gray-900 tracking-tight">Certifications</h3>
      </div>
      
      <div className="space-y-4">
        {certifications.map((cert, index) => (
          <div key={cert.id || index} className="group flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-gray-200 bg-white hover:border-[var(--theme-red-start)]/30 hover:shadow-md hover:shadow-theme-red/5 transition-all">
            <div className="flex items-start gap-4 mb-4 md:mb-0">
              <div className="w-12 h-12 shrink-0 bg-[var(--theme-red-start)]/10 rounded-full flex items-center justify-center border border-[var(--theme-red-start)]/20">
                <Award className="w-6 h-6 text-theme-red" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-theme-red transition-colors mb-1">{cert.title}</h4>
                <p className="text-sm font-semibold text-gray-500 mb-2">{cert.issuedBy}</p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-theme-red bg-[var(--theme-red-start)]/10 w-fit px-2.5 py-1 rounded-md border border-[var(--theme-red-start)]/20">
                  <Calendar className="w-3.5 h-3.5" />
                  Issued {formatDate(cert.issueDate)} {cert.expiryDate && `· Expires ${formatDate(cert.expiryDate)}`}
                </div>
              </div>
            </div>
            
            {cert.url && (
              <a 
                href={cert.url} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-[var(--theme-red-start)] hover:border-[var(--theme-red-start)] hover:text-white text-sm font-bold rounded-xl transition-all shadow-sm w-full md:w-auto text-gray-700"
              >
                View Credential <LinkIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProfileCertifications;
