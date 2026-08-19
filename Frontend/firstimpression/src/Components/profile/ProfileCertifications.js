import React from 'react';

const ProfileCertifications = ({ certifications }) => {
  if (!certifications || certifications.length === 0) {
    return (
      <div>
        <h2 className="text-[1.7rem] font-bold text-gray-900 mb-8 tracking-tight">Certifications</h2>
        <p className="text-gray-500">No certifications added yet.</p>
        <button className="mt-4 px-6 py-2.5 bg-white border border-gray-200 text-gray-500 text-sm font-bold rounded-full hover:bg-gray-50 transition-colors shadow-sm">
          Add Certification
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
        <h2 className="text-[1.7rem] font-bold text-gray-900 tracking-tight">Certifications</h2>
        <button className="px-5 py-2 bg-white border border-gray-200 text-gray-500 text-sm font-bold rounded-full hover:bg-gray-50 transition-colors shadow-sm">
          Add New
        </button>
      </div>
      
      <div className="space-y-10 max-w-3xl">
        {certifications.map((cert, index) => (
          <div key={cert.id || index} className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Certification #{index + 1}</h3>
              <button className="text-red-500 hover:text-red-700 text-sm font-semibold transition-colors">Remove</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Certification Title</label>
                <input 
                  type="text" 
                  defaultValue={cert.title || ''}
                  readOnly
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Issued By</label>
                <input 
                  type="text" 
                  defaultValue={cert.issuedBy || ''}
                  readOnly
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Issue Date</label>
                <input 
                  type="date" 
                  defaultValue={formatDateForInput(cert.issueDate)}
                  readOnly
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Expiry Date</label>
                <input 
                  type="date" 
                  defaultValue={formatDateForInput(cert.expiryDate)}
                  readOnly
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Credential URL</label>
              <input 
                type="url" 
                defaultValue={cert.url || ''}
                readOnly
                placeholder="https://..."
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
              />
            </div>
            
            {index < certifications.length - 1 && (
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

export default ProfileCertifications;
