import React from 'react';

const ProfileProjects = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return (
      <div>
        <h2 className="text-[1.7rem] font-bold text-gray-900 mb-8 tracking-tight">Projects</h2>
        <p className="text-gray-500">No projects added yet.</p>
        <button className="mt-4 px-6 py-2.5 bg-white border border-gray-200 text-gray-500 text-sm font-bold rounded-full hover:bg-gray-50 transition-colors shadow-sm">
          Add Project
        </button>
      </div>
    );
  }

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch(e) {
      return '';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 max-w-3xl">
        <h2 className="text-[1.7rem] font-bold text-gray-900 tracking-tight">Projects</h2>
        <button className="px-5 py-2 bg-white border border-gray-200 text-gray-500 text-sm font-bold rounded-full hover:bg-gray-50 transition-colors shadow-sm">
          Add New
        </button>
      </div>
      
      <div className="space-y-10 max-w-3xl">
        {projects.map((project, index) => (
          <div key={project.id || index} className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Project #{index + 1}</h3>
              <button className="text-red-500 hover:text-red-700 text-sm font-semibold transition-colors">Remove</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Project Title</label>
                <input 
                  type="text" 
                  defaultValue={project.title || ''}
                  readOnly
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Project Link</label>
                <input 
                  type="url" 
                  defaultValue={project.projectLink || ''}
                  readOnly
                  placeholder="https://github.com/..."
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Start Date</label>
                <input 
                  type="date" 
                  defaultValue={formatDateForInput(project.startDate)}
                  readOnly
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">End Date</label>
                <input 
                  type="date" 
                  defaultValue={formatDateForInput(project.endDate)}
                  readOnly
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Technologies</label>
              <input 
                type="text" 
                defaultValue={project.technologies ? project.technologies.join(', ') : ''}
                readOnly
                placeholder="React, Node.js, etc."
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Description</label>
              <textarea 
                defaultValue={project.description || ''}
                readOnly
                rows={4}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium resize-none"
              />
            </div>
            
            {index < projects.length - 1 && (
              <hr className="border-gray-100 mt-10" />
            )}
          </div>
        ))}

        <div className="pt-6 border-t border-gray-100">
          <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-500 text-sm font-bold rounded-full hover:bg-gray-50 transition-colors shadow-sm">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileProjects;
