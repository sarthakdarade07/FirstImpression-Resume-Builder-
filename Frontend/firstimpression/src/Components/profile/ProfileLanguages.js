import React from 'react';

const ProfileLanguages = ({ languages }) => {
  if (!languages || languages.length === 0) {
    return (
      <div>
        <h2 className="text-[1.7rem] font-bold text-gray-900 mb-8 tracking-tight">Languages</h2>
        <p className="text-gray-500">No languages added yet.</p>
        <button className="mt-4 px-6 py-2.5 bg-white border border-gray-200 text-gray-500 text-sm font-bold rounded-full hover:bg-gray-50 transition-colors shadow-sm">
          Add Language
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8 max-w-3xl">
        <h2 className="text-[1.7rem] font-bold text-gray-900 tracking-tight">Languages</h2>
        <button className="px-5 py-2 bg-white border border-gray-200 text-gray-500 text-sm font-bold rounded-full hover:bg-gray-50 transition-colors shadow-sm">
          Add New
        </button>
      </div>
      
      <div className="space-y-6 max-w-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {languages.map((lang, index) => (
            <div key={lang.id || index} className="flex items-center gap-2">
              <input 
                type="text" 
                defaultValue={lang.language || ''}
                readOnly
                placeholder="Language"
                className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
              />
              <input 
                type="text" 
                defaultValue={lang.level || ''}
                readOnly
                placeholder="Level"
                className="w-24 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
              />
              <button className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-100">
          <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-500 text-sm font-bold rounded-full hover:bg-gray-50 transition-colors shadow-sm">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileLanguages;
