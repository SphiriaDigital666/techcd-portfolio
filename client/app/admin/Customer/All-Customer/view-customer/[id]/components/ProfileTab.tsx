"use client";

import React from 'react';

interface ProfileTabProps {
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    shippingInfo: {
      city: string;
    };
  };
  editData: any;
  setEditData: (data: any) => void;
  isEditing: boolean;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ customer, editData, setEditData, isEditing }) => {
  const handleInputChange = (field: string, value: string) => {
    if (isEditing) {
      setEditData((prev: any) => ({
        ...prev,
        [field]: value
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Avatar Section */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 p-1">
            <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-600">
                {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
              </span>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-bold text-white">{customer.firstName} {customer.lastName}</h2>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* First Name */}
        <div className='space-y-4'>
          <label className="block text-[17px]  text-[#FFFFFF] font-medium mb-2">
            First Name
          </label>
          <input
            type="text"
            value={editData.firstName || customer.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className={`w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors ${
              isEditing ? 'bg-[#1a2a5a]' : 'bg-transparent'
            }`}
            readOnly={!isEditing}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-[17px] font-medium text-[#FFFFFF] mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={editData.lastName || customer.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className={`w-full px-4 py-1 border placeholder:text-xl border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors ${
              isEditing ? 'bg-[#1a2a5a]' : 'bg-transparent'
            }`}
            readOnly={!isEditing}
          />
        </div>

        <div>
          <label className="block text-[17px] text-[#FFFFFF]  font-medium mb-2">
            Location
          </label>
          <div className="relative">
            <select 
              value={editData.shippingInfo?.city || customer.shippingInfo?.city || ''}
              onChange={(e) => handleInputChange('shippingInfo.city', e.target.value)}
              className={`w-full px-4 py-1 border border-[#172D6D] rounded-xl appearance-none focus:outline-none focus:border-[#3B82F6] transition-colors ${
                isEditing ? 'bg-[#1a2a5a] text-white' : 'bg-transparent text-gray-400'
              }`}
              disabled={!isEditing}
            >
              <option value="">Select City</option>
              <option value="new-york">New York</option>
              <option value="london">London</option>
              <option value="tokyo">Tokyo</option>
              <option value="paris">Paris</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[17px] font-medium text-[#FFFFFF] mb-2">
            Biography
          </label>
          <textarea
            rows={4}
            placeholder="No biography added"
            className={`w-full px-4 py-1 border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors resize-none ${
              isEditing ? 'bg-[#1a2a5a]' : 'bg-transparent'
            }`}
            readOnly={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileTab; 