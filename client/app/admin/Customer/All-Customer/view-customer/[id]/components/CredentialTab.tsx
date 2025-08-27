"use client";

import React from 'react';

interface CredentialTabProps {
  customer: {
    email: string;
    username: string;
    phoneNo: string;
  };
}

const CredentialTab: React.FC<CredentialTabProps> = ({ customer }) => {
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
          value={customer.email}
          className="w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base placeholder:text-lg sm:placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-transparent"
          readOnly
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
          value={customer.username}
          className="w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base placeholder:text-lg sm:placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-transparent"
          readOnly
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
          className="w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base placeholder:text-lg sm:placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-transparent"
          readOnly
          disabled
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
          value={customer.phoneNo || ''}
          placeholder="No phone number added"
          className="w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base placeholder:text-lg sm:placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-transparent"
          readOnly
          disabled
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
          className="w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base placeholder:text-lg sm:placeholder:text-xl border border-[#172D6D] rounded-xl text-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-transparent"
          placeholder="None"
          disabled={true}
        />
      </div>
    </div>
  );
};

export default CredentialTab; 
