"use client";

import React from 'react';

interface CredentialProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phoneNo: string;
    password: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const Credential: React.FC<CredentialProps> = ({ formData, onInputChange }) => {
  return (
    <div className="mb-8">
      <h3 className="xl:text-[32px] text-[24px] font-semibold text-[#E5E5E5] mb-6">Credential</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[#FFFFFF] text-[17px] mb-2">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => onInputChange('firstName', e.target.value)}
            className="w-full px-4 xl:py-1 py-2  border border-[#172D6D] rounded-md text-white focus:border-[#028EFC] focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-[#FFFFFF] text-[17px] mb-2">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => onInputChange('lastName', e.target.value)}
            className="w-full px-4 xl:py-1 py-2  border border-[#172D6D] rounded-md text-white focus:border-[#028EFC] focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-[#FFFFFF] text-[17px] mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            className="w-full px-4 xl:py-1 py-2  border border-[#172D6D] rounded-md text-white focus:border-[#028EFC] focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-[#FFFFFF] text-[17px] mb-2">User name</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => onInputChange('username', e.target.value)}
            className="w-full px-4 xl:py-1 py-2 border border-[#172D6D] rounded-md text-white focus:border-[#028EFC] focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-[#FFFFFF] text-[17px] mb-2">Phone number</label>
          <input
            type="tel"
            value={formData.phoneNo}
            onChange={(e) => onInputChange('phoneNo', e.target.value)}
            className="w-full px-4 xl:py-1 py-2 border border-[#172D6D] rounded-md text-white focus:border-[#028EFC] focus:outline-none"
            placeholder="e.g., +1234567890 (no spaces)"
            required
          />
        </div>
        <div>
          <label className="block text-[#FFFFFF] text-[17px] mb-2">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => onInputChange('password', e.target.value)}
            className="w-full px-4 xl:py-1 py-2  border border-[#172D6D] rounded-md text-white focus:border-[#028EFC] focus:outline-none"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default Credential;
