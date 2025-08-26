"use client";

import React from 'react';

interface CredentialTabProps {
  customer: {
    email: string;
    username: string;
    phoneNo: string;
  };
  editData: any;
  setEditData: (data: any) => void;
  isEditing: boolean;
}

const CredentialTab: React.FC<CredentialTabProps> = ({ customer, editData, setEditData, isEditing }) => {
  const handleInputChange = (field: string, value: string) => {
    if (isEditing) {
      setEditData((prev: any) => ({
        ...prev,
        [field]: value
      }));
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Email Section */}
      <div>
        <div className="mb-2">
          <label className="block text-sm sm:text-base lg:text-lg text-[#FFFFFF] font-medium">
            Email
          </label>
        </div>
        <input
          type="email"
          value={editData.email || customer.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={`w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base placeholder:text-lg sm:placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors ${
            isEditing ? 'bg-[#1a2a5a]' : 'bg-transparent'
          }`}
          readOnly={!isEditing}
        />
      </div>

      {/* Username Section */}
      <div>
        <div className="mb-2">
          <label className="block text-sm sm:text-base lg:text-lg text-[#FFFFFF] font-medium">
            Username
          </label>
        </div>
        <input
          type="text"
          value={editData.username || customer.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          className={`w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base placeholder:text-lg sm:placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors ${
            isEditing ? 'bg-[#1a2a5a]' : 'bg-transparent'
          }`}
          readOnly={!isEditing}
        />
      </div>

      {/* Password Section */}
      <div>
        <div className="mb-2">
          <label className="block text-sm sm:text-base lg:text-lg text-[#FFFFFF] font-medium">
            Password
          </label>
        </div>
        <input
          type="password"
          value="••••••••"
          className={`w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base placeholder:text-lg sm:placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors ${
            isEditing ? 'bg-[#1a2a5a]' : 'bg-transparent'
          }`}
          readOnly={!isEditing}
          disabled={!isEditing}
        />
      </div>

      {/* Phone Number Section */}
      <div>
        <div className="mb-2">
          <label className="block text-sm sm:text-base lg:text-lg text-[#FFFFFF] font-medium">
            Phone number
          </label>
        </div>
        <input
          type="tel"
          value={editData.phoneNo || customer.phoneNo || ''}
          onChange={(e) => handleInputChange('phoneNo', e.target.value)}
          placeholder="No phone number added"
          className={`w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base placeholder:text-lg sm:placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors ${
            isEditing ? 'bg-[#1a2a5a]' : 'bg-transparent'
          }`}
          readOnly={!isEditing}
          disabled={!isEditing}
        />
      </div>

      {/* 2-Factor Authentication Section */}
      <div>
        <div className="mb-2">
          <label className="block text-sm sm:text-base lg:text-lg text-[#FFFFFF] font-medium">
            2-factor authentication
          </label>
        </div>
        <input
          type="text"
          value="None"
          className={`w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base placeholder:text-lg sm:placeholder:text-xl border border-[#172D6D] rounded-xl text-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors ${
            isEditing ? 'bg-[#1a2a5a]' : 'bg-transparent'
          }`}
          placeholder="None"
          disabled={true}
        />
      </div>
    </div>
  );
};

export default CredentialTab; 
