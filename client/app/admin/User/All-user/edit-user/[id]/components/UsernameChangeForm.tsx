"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Editbutton from './Editbutton';

interface UsernameChangeFormProps {
  onClose: () => void;
  onSave: (usernameData: { newUsername: string; currentPassword: string }) => void;
  currentUsername?: string;
}

const UsernameChangeForm: React.FC<UsernameChangeFormProps> = ({
  onClose,
  onSave,
  currentUsername = ''
}) => {
  const [newUsername, setNewUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  // Don't pre-fill the new username field - let user enter it fresh
  // Don't pre-fill the password field - let user enter it fresh

  const handleSave = () => {
    if (!currentPassword.trim()) {
      alert('Please enter your current password');
      return;
    }
    if (!newUsername.trim()) {
      alert('Please enter a new username');
      return;
    }
    onSave({ newUsername, currentPassword });
    onClose();
  };

  return (
    <div className="w-full">
      {/* Header with Back Arrow and Title */}
      <div className="flex items-center mb-8">
        <button
          onClick={onClose}
          className="mr-4 p-2 hover:bg-[#172D6D] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="2xl:text-2xl text-[16px] font-semibold text-[#E5E5E5]">
          Account Credential
        </h1>
      </div>

      {/* Username Change Fields */}
      <div className="space-y-6">
        {/* Current Username Display */}
        <div>
          <label className="block text-[#FFFFFF] text-[17px] font-medium mb-3">
            Current Username
          </label>
          <input
            type="text"
            value={currentUsername}
            readOnly
            className="w-full px-4 py-1 border border-[#172D6D]  rounded-xl text-white  focus:outline-none focus:border-[#3B82F6] transition-colors "
          />
        </div>

        {/* New User Name */}
        <div>
          <label className="block text-[#FFFFFF] text-[17px] font-medium mb-3">
            New Username
          </label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="w-full px-4 py-1 border border-[#172D6D]  rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
           
          />
        </div>

        {/* Current Password */}
        <div>
          <label className="block text-[#FFFFFF] text-[17px] font-medium mb-3">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-1 border border-[#172D6D]  rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
       
          />
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end pt-8">
        <Editbutton 
          identifier="add-product-btn" 
          buttonText="Save Changes" 
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default UsernameChangeForm;
