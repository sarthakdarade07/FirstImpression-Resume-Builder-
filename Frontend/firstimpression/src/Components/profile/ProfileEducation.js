import React from 'react';

const ProfileEducation = ({ education }) => {
  if (!education || education.length === 0) {
    return (
      <div>
        <h2 className="text-[1.7rem] font-bold text-gray-900 mb-8 tracking-tight">Education</h2>
        <p className="text-gray-500">No education added yet.</p>
        <button className="mt-4 px-6 py-2.5 bg-white border border-gray-200 text-gray-500 text-sm font-bold rounded-full hover:bg-gray-50 transition-colors shadow-sm">
          Add Education
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8 max-w-3xl">
        <h2 className="text-[1.7rem] font-bold text-gray-900 tracking-tight">Education</h2>
        <button className="px-5 py-2 bg-white border border-gray-200 text-gray-500 text-sm font-bold rounded-full hover:bg-gray-50 transition-colors shadow-sm">
          Add New
        </button>
      </div>
      
      <div className="space-y-10 max-w-3xl">
        {education.map((edu, index) => (
          <div key={edu.id || index} className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Education #{index + 1}</h3>
              <button className="text-red-500 hover:text-red-700 text-sm font-semibold transition-colors">Remove</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Education Type</label>
                <input 
                  type="text" 
                  defaultValue={edu.educationType || ''}
                  readOnly
                  placeholder="e.g. Bachelor's Degree"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Specialization</label>
                <input 
                  type="text" 
                  defaultValue={edu.specialization || ''}
                  readOnly
                  placeholder="e.g. Computer Science"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Institute Name</label>
                <input 
                  type="text" 
                  defaultValue={edu.instituteName || ''}
                  readOnly
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Board / University</label>
                <input 
                  type="text" 
                  defaultValue={edu.boardOrUniversity || ''}
                  readOnly
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Start Year</label>
                <input 
                  type="text" 
                  defaultValue={edu.startYear || ''}
                  readOnly
                  placeholder="YYYY"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">End Year</label>
                <input 
                  type="text" 
                  defaultValue={edu.endYear || ''}
                  readOnly
                  placeholder="YYYY or Present"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Score Type</label>
                <input 
                  type="text" 
                  defaultValue={edu.scoreType || ''}
                  readOnly
                  placeholder="e.g. CGPA, Percentage"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Score</label>
                <input 
                  type="text" 
                  defaultValue={edu.score || ''}
                  readOnly
                  placeholder="e.g. 9.5 or 95%"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
                />
              </div>
            </div>
            
            {index < education.length - 1 && (
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

export default ProfileEducation;
