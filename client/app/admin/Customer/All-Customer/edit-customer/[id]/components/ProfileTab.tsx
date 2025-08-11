"use client";

import React from 'react';
import SaveButton from './Savebutton';
import { FiEdit3 } from 'react-icons/fi';

const ProfileTab = () => {
  return (
    <div className="space-y-6">
      {/* Profile Avatar Section */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 p-1">
            <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-600">JB</span>
            </div>
          </div>
          <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#3B82F6] rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
            <FiEdit3 className="text-white text-sm" />
          </button>
        </div>
        <h2 className="text-xl font-bold text-white">James Bond</h2>
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
            className="w-full px-4 py-1  placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
        
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-[17px] font-medium text-[#FFFFFF] mb-2">
            Last Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-1 border placeholder:text-xl  border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
          
          />
        </div>

        <div>
          <label className="block text-[17px] text-[#FFFFFF]  font-medium mb-2">
            Location
          </label>
          <div className="relative">
            <select className="w-full px-4 py-1  border border-[#172D6D] rounded-xl  appearance-none focus:outline-none focus:border-[#3B82F6] transition-colors">
            
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
            className="w-full px-4 py-1 border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors resize-none"
           
          />
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end pt-6">
      <SaveButton identifier="add-product-btn" buttonText="Save Changes" />
      </div>
    </div>
  );
};

export default ProfileTab; 