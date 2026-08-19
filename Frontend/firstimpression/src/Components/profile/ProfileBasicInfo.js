import React from 'react';

const ProfileBasicInfo = ({ data }) => {
  if (!data) return null;

  const firstName = data.name ? data.name.split(' ')[0] : '';
  const lastName = data.name && data.name.split(' ').length > 1 ? data.name.split(' ').slice(1).join(' ') : '';

  return (
    <div>
      <h2 className="text-[1.7rem] font-bold text-gray-900 mb-8 tracking-tight">Basic Info</h2>
      
      <div className="space-y-8 max-w-3xl">
        
        {/* Profile Photo - Matching the General tab style */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-24 h-24 rounded-[32px] bg-[#222] flex items-center justify-center text-white text-2xl font-medium shadow-md overflow-hidden flex-shrink-0">
            {data.photoUrl ? (
              <img src={data.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              data.name ? data.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase() : 'SE'
            )}
          </div>
          <div>
            <h4 className="text-gray-900 font-bold mb-1">Profile photo</h4>
            <p className="text-sm text-gray-500 mb-4">We support PNGs, JPEGs and GIFs under 10MB</p>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center justify-center px-6 py-2.5 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-500 shadow-sm">
                Upload new picture
              </button>
            </div>
          </div>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">First name</label>
            <input 
              type="text" 
              defaultValue={firstName}
              readOnly
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Last name</label>
            <input 
              type="text" 
              defaultValue={lastName}
              readOnly
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium"
            />
          </div>
        </div>

        {/* Role & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Role / Headline</label>
            <input 
              type="text" 
              defaultValue={data.role || ''}
              readOnly
              placeholder="e.g. Software Engineer"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Location</label>
            <input 
              type="text" 
              defaultValue={data.location || ''}
              readOnly
              placeholder="e.g. New York, NY"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium placeholder-gray-400"
            />
          </div>
        </div>

        <hr className="border-gray-100 my-8" />

        {/* Contact Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Email Address</label>
            <input 
              type="email" 
              defaultValue={data.email || ''}
              readOnly
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 font-medium cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Phone Number</label>
            <input 
              type="tel" 
              defaultValue={data.phoneNo || ''}
              readOnly
              placeholder="No phone number"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium placeholder-gray-400"
            />
          </div>
        </div>

        <hr className="border-gray-100 my-8" />

        {/* Social Links */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">LinkedIn URL</label>
            <input 
              type="url" 
              defaultValue={data.linkedinUrl || ''}
              readOnly
              placeholder="https://linkedin.com/in/username"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">GitHub URL</label>
            <input 
              type="url" 
              defaultValue={data.githubUrl || ''}
              readOnly
              placeholder="https://github.com/username"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Portfolio URL</label>
            <input 
              type="url" 
              defaultValue={data.portfolioUrl || ''}
              readOnly
              placeholder="https://yourwebsite.com"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--theme-red-start)] transition-all font-medium placeholder-gray-400"
            />
          </div>
        </div>
        
        <div className="pt-4">
          <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-500 text-sm font-bold rounded-full hover:bg-gray-50 transition-colors shadow-sm">
            Save changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfileBasicInfo;
