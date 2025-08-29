"use client";

import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Editbutton from './Editbutton';
interface EmailChangeFormProps {
  onClose: () => void;
  onSave: (emailData: { newEmail: string; currentPassword: string }) => void;
  currentEmail?: string;
}

const EmailChangeForm: React.FC<EmailChangeFormProps> = ({
  onClose,
  onSave,
  currentEmail = ''
}) => {
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const handleSave = () => {
    if (!currentPassword.trim()) {
      alert('Please enter your current password');
      return;
    }
    if (!newEmail.trim()) {
      alert('Please enter a new email');
      return;
    }
    onSave({ newEmail, currentPassword });
    onClose();
  };

  return (
    <div className="w-full">
      {/* Header with Back Arrow and Title */}
      <div className="flex items-center mb-8">
        <button
          onClick={onClose}
          className="mr-4 p-2  rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="2xl:text-2xl text-[16px] font-semibold text-[#E5E5E5]">
          Account Credential
        </h1>
      </div>

      {/* Email Change Fields */}
      <div className="space-y-6">
        {/* Current Email Display */}
        <div>
          <label className="block text-[#FFFFFF] text-[17px] font-medium mb-3">
            Current Email
          </label>
          <input
            type="email"
            value={currentEmail}
            readOnly
            className="w-full px-4 py-1 bg-[#0B1739] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-gray-700/30"
          />
        </div>

        {/* New Email */}
        <div>
          <label className="block text-[#FFFFFF] text-[17px] font-medium mb-3">
            New Email
          </label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full px-4 py-1 bg-[#0B1739]  rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
            placeholder="Enter your new email address"
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
            className="w-full px-4 py-1 bg-[#0B1739]  rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
            placeholder="Enter your current password to verify"
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

export default EmailChangeForm;
