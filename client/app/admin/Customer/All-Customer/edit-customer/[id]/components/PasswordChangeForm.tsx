"use client";

import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Editbutton from './Editbutton';
interface PasswordChangeFormProps {
  onClose: () => void;
  onSave: (passwordData: { currentPassword: string; newPassword: string; confirmPassword: string }) => void;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({
  onClose,
  onSave
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    if (!currentPassword.trim()) {
      alert('Please enter your current password');
      return;
    }
    if (!newPassword.trim()) {
      alert('Please enter a new password');
      return;
    }
    if (!confirmPassword.trim()) {
      alert('Please confirm your new password');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }
    onSave({ currentPassword, newPassword, confirmPassword });
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

      {/* Password Change Fields */}
      <div className="space-y-6">
        {/* Current Password */}
        <div>
          <label className="block text-[#FFFFFF] text-[17px] font-medium mb-3">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-1 bg-[#0B1739]  rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
            placeholder="Enter your current password"
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block text-[#FFFFFF] text-[17px] font-medium mb-3">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-1 bg-[#0B1739]  rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
            placeholder="Enter your new password"
          />
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-[#FFFFFF] text-[17px] font-medium mb-3">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-1 bg-[#0B1739]  rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
            placeholder="Confirm your new password"
          />
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end pt-8">
        <Editbutton identifier="add-product-btn" buttonText="Save Changes" onClick={handleSave} />
      </div>
    </div>
  );
};

export default PasswordChangeForm;
