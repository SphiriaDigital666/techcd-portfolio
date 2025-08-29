"use client";

import React, { useState, useEffect } from 'react';
import SaveButton from './Savebutton';
import { FiEdit3 } from 'react-icons/fi';
import { User, updateUserProfile, getUserRoles, UserRole } from '@/lib/api/userApi';

interface ProfileTabProps {
  user: User;
  userId: string;
  onUserUpdate: () => Promise<void>;
}

const ProfileTab = ({ user, userId, onUserUpdate }: ProfileTabProps) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    role: user.role?._id || ''
  });
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      role: user.role?._id || ''
    });
    console.log('ProfileTab: User data loaded:', user);
    console.log('ProfileTab: User role object:', user.role);
    console.log('ProfileTab: User role ID:', user.role?._id);
    console.log('ProfileTab: User role name:', user.role?.name);
  }, [user]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        console.log('ProfileTab: Fetching user roles...');
        const rolesData = await getUserRoles();
        console.log('ProfileTab: Roles fetched:', rolesData);
        setRoles(rolesData);
      } catch (error) {
        console.error('ProfileTab: Failed to fetch roles:', error);
      }
    };
    fetchRoles();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    console.log(`ProfileTab: Input change - ${field}:`, value);
    setFormData(prev => {
      const newData = {
        ...prev,
        [field]: value
      };
      console.log('ProfileTab: New form data:', newData);
      return newData;
    });
  };

  const handleSave = async () => {
    try {
      // Basic validation
      if (!formData.firstName || !formData.lastName || !formData.role) {
        setMessage({ type: 'error', text: 'Please fill in all required fields (First Name, Last Name, and Role)' });
        return;
      }

      setLoading(true);
      setMessage(null);
      
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role
      };
      
      console.log('ProfileTab: Attempting to update profile with data:', updateData);
      console.log('ProfileTab: Role value:', formData.role);
      console.log('ProfileTab: Available roles:', roles);
      
      const result = await updateUserProfile(userId, updateData);
      
      console.log('ProfileTab: Profile update result:', result);
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      // Refresh user data
      await onUserUpdate();
    } catch (error) {
      console.error('ProfileTab: Profile update error:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const getInitials = () => {
    const first = formData.firstName.charAt(0).toUpperCase();
    const last = formData.lastName.charAt(0).toUpperCase();
    return first + last;
  };

  return (
    <div className="space-y-6">
      {/* Profile Avatar Section */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 p-1">
            <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-600">{getInitials()}</span>
            </div>
          </div>
          <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#3B82F6] rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
            <FiEdit3 className="text-white text-sm" />
          </button>
        </div>
        <h2 className="text-xl font-bold text-white">{formData.firstName} {formData.lastName}</h2>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`p-3 rounded-md ${
          message.type === 'success' ? 'bg-green-500/20 border border-green-500 text-green-400' : 'bg-red-500/20 border border-red-500 text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      {/* Form Fields */}
      <div className="space-y-6">
        {/* First Name */}
        <div className='space-y-4'>
          <label className="block text-[17px]  text-[#FFFFFF] font-medium mb-2">
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="w-full px-4 py-1  placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
            placeholder="Enter first name"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-[17px] font-medium text-[#FFFFFF] mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="w-full px-4 py-1 border placeholder:text-xl  border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
            placeholder="Enter last name"
          />
        </div>
        <div>
          <label className="block text-[17px] font-medium text-[#FFFFFF] mb-2">
            Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
            className="w-full px-4 xl:py-1 py-2 border border-[#172D6D] rounded-md text-white focus:border-[#028EFC] focus:outline-none bg-transparent"
            required
          >
            <option value="" className="bg-[#172D6D] text-white">Select Role</option>
            {roles.map(role => (
              <option key={role._id} value={role._id} className="bg-[#172D6D] text-white">
                {role.name}
              </option>
            ))}
          </select>
        </div>

        
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end pt-6">
        <SaveButton 
          identifier="add-product-btn" 
          buttonText={loading ? "Saving..." : "Save Changes"} 
          onClick={handleSave}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default ProfileTab; 