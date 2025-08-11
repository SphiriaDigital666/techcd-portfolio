"use client";

import React from 'react';
import SaveButton from './Savebutton';
const CredentialTab = () => {
  return (
    <div className="space-y-6">
      {/* Email Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-[17px] text-[#FFFFFF] font-medium">
            Email
          </label>
          <button className="text-[#028EFC]  text-sm font-medium transition-colors">
            Change email address
          </button>
        </div>
        <input
          type="email"
          className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
        />
      </div>

      {/* Username Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-[17px] text-[#FFFFFF] font-medium">
            Username
          </label>
          <button className="text-[#028EFC]  text-sm font-medium transition-colors">
            Change username
          </button>
        </div>
        <input
          type="text"
          className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
        />
      </div>

      {/* Password Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-[17px] text-[#FFFFFF] font-medium">
            Password
          </label>
          <button className="text-[#028EFC]  text-sm font-medium transition-colors">
            Change password
          </button>
        </div>
        <input
          type="password"
          className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
        />
      </div>

      {/* Phone Number Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-[17px] text-[#FFFFFF] font-medium">
            Phone number
          </label>
          <button className="text-[#028EFC]  text-sm font-medium transition-colors">
            Add phone number
          </button>
        </div>
        <input
          type="tel"
          className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
        />
      </div>

      {/* 2-Factor Authentication Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-[17px] text-[#FFFFFF] font-medium">
            2-factor authentication
          </label>
          <button className="text-[#028EFC]  text-sm font-medium transition-colors">
            Change
          </button>
        </div>
        <input
          type="text"
          className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
          placeholder="None"
          disabled
        />
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end pt-6">
      <SaveButton identifier="add-product-btn" buttonText="Save Changes" />
      </div>
    </div>
  );
};

export default CredentialTab; 
