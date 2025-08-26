"use client";

import React, { useEffect, useState } from 'react';
import { getUserRoles, UserRole } from '../../../../lib/api/userApi';

interface CredentialProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phoneNumber: string;
    password: string;
    role: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const Credential: React.FC<CredentialProps> = ({ formData, onInputChange }) => {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const fetchedRoles = await getUserRoles();
        setRoles(fetchedRoles);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

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
            value={formData.phoneNumber}
            onChange={(e) => onInputChange('phoneNumber', e.target.value)}
            className="w-full px-4 xl:py-1 py-2 border border-[#172D6D] rounded-md text-white focus:border-[#028EFC] focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-[#FFFFFF] text-[17px] mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => onInputChange('password', e.target.value)}
              className="w-full px-4 xl:py-1 py-2 pr-12 border border-[#172D6D] rounded-md text-white focus:border-[#028EFC] focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] hover:text-[#E5E5E5] transition-colors"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-[#FFFFFF] text-[17px] mb-2">Role</label>
          <select
            value={formData.role}
            onChange={(e) => onInputChange('role', e.target.value)}
            className="w-full px-4 xl:py-1 py-2 border border-[#172D6D] rounded-md text-white focus:border-[#028EFC] focus:outline-none bg-transparent"
            required
            disabled={loading}
          >
            <option value="" className="bg-[#172D6D] text-white">
              {loading ? 'Loading roles...' : 'Select Role'}
            </option>
            {roles.map((role) => (
              <option key={role._id} value={role._id} className="bg-[#172D6D] text-white">
                {role.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Credential;
