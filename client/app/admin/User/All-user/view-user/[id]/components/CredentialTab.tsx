"use client";

import React from 'react';
import { User } from '../../../../../../../lib/api/userApi';

interface CredentialTabProps {
  user: User;
}

const CredentialTab: React.FC<CredentialTabProps> = ({ user }) => {
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
          value={user.email}
          readOnly
          className="w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base placeholder:text-lg sm:placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-[#1a2a5a]"
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
          value={user.username}
          readOnly
          className="w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base placeholder:text-lg sm:placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-[#1a2a5a]"
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
          readOnly
          className="w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base placeholder:text-lg sm:placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-[#1a2a5a]"
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
          value={user.phoneNo || 'No phone number added'}
          readOnly
          className="w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base placeholder:text-lg sm:placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-[#1a2a5a]"
        />
      </div>

      {/* 2-Factor Authentication Section */}
      <div>
        
      </div>
    </div>
  );
};

export default CredentialTab; 
