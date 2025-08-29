"use client";

import React, { useState, useEffect } from 'react';
import SaveButton from './Savebutton';
import { User, updateUserEmail, updateUserUsername, updateUserPassword, updateUserPhone, testBackendConnection } from '@/lib/api/userApi';

import PhoneNumberForm from './PhoneNumberForm';
import PasswordChangeForm from './PasswordChangeForm';
import UsernameChangeForm from './UsernameChangeForm';
import EmailChangeForm from './EmailChangeForm';

interface CredentialTabProps {
  user: User;
  userId: string;
  onUserUpdate: () => Promise<void>;
}

const CredentialTab = ({ user, userId, onUserUpdate }: CredentialTabProps) => {
  const [show2FASidebar, setShow2FASidebar] = useState(false);
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showUsernameForm, setShowUsernameForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [selected2FA, setSelected2FA] = useState('none');
  const [phoneData, setPhoneData] = useState({ countryCode: 'US +1', phoneNumber: user.phoneNo || '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    setPhoneData(prev => ({
      ...prev,
      phoneNumber: user.phoneNo || ''
    }));
  }, [user.phoneNo]);

  const handle2FAChange = () => {
    setShow2FASidebar(true);
  };

  const handlePhoneChange = () => {
    setShowPhoneForm(true);
  };

  const handlePasswordChange = () => {
    setShowPasswordForm(true);
  };

  const handleUsernameChange = () => {
    setShowUsernameForm(true);
  };

  const handleEmailChange = () => {
    setShowEmailForm(true);
  };

  const handleCloseSidebar = () => {
    setShow2FASidebar(false);
  };

  const handleClosePhoneForm = () => {
    setShowPhoneForm(false);
  };

  const handleClosePasswordForm = () => {
    setShowPasswordForm(false);
  };

  const handleCloseUsernameForm = () => {
    setShowUsernameForm(false);
  };

  const handleCloseEmailForm = () => {
    setShowEmailForm(false);
  };

  const handleSave2FA = () => {
    // Handle save logic here
    console.log('Selected 2FA:', selected2FA);
    setShow2FASidebar(false);
  };

  const handleSavePhone = async (data: { countryCode: string; phoneNumber: string; currentPassword: string }) => {
    try {
      setLoading(true);
      setMessage(null);
      
      await updateUserPhone(userId, data.phoneNumber, data.currentPassword);
      setPhoneData(data);
      setMessage({ type: 'success', text: 'Phone number updated successfully!' });
      // Refresh user data
      await onUserUpdate();
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to update phone number' });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePassword = async (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
    try {
      setLoading(true);
      setMessage(null);
      
      await updateUserPassword(userId, data.currentPassword, data.newPassword);
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      // Refresh user data
      await onUserUpdate();
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to update password' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUsername = async (data: { newUsername: string; currentPassword: string }) => {
    try {
      console.log('CredentialTab: Attempting to update username with data:', { newUsername: data.newUsername, currentPassword: '***' });
      setLoading(true);
      setMessage(null);
      
      await updateUserUsername(userId, data.newUsername, data.currentPassword);
      setMessage({ type: 'success', text: 'Username updated successfully!' });
      // Refresh user data
      await onUserUpdate();
    } catch (error) {
      console.error('CredentialTab: Username update error:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to update username' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEmail = async (data: { newEmail: string; currentPassword: string }) => {
    try {
      console.log('CredentialTab: Attempting to update email with data:', { newEmail: data.newEmail, currentPassword: '***' });
      console.log('CredentialTab: Full data object:', data);
      console.log('CredentialTab: Password length:', data.currentPassword.length);
      setLoading(true);
      setMessage(null);
      
      const result = await updateUserEmail(userId, data.newEmail, data.currentPassword);
      console.log('CredentialTab: Email update successful:', result);
      setMessage({ type: 'success', text: 'Email updated successfully!' });
      // Refresh user data
      await onUserUpdate();
    } catch (error) {
      console.error('CredentialTab: Email update error:', error);
      console.error('CredentialTab: Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace'
      });
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to update email' });
    } finally {
      setLoading(false);
    }
  };

  const handleTestBackendConnection = async () => {
    try {
      setLoading(true);
      setMessage(null);
      
      console.log('Testing backend connection...');
      const isConnected = await testBackendConnection();
      
      if (isConnected) {
        setMessage({ type: 'success', text: 'Backend connection successful! Server is running and accessible.' });
      } else {
        setMessage({ type: 'error', text: 'Backend connection failed. Server may not be running or accessible.' });
      }
    } catch (error) {
      console.error('Backend connection test error:', error);
      setMessage({ type: 'error', text: 'Backend connection test failed. Check console for details.' });
    } finally {
      setLoading(false);
    }
  };

  // Show phone number form when Add phone number is clicked
  if (showPhoneForm) {
    return (
      <PhoneNumberForm
        onClose={handleClosePhoneForm}
        onSave={handleSavePhone}
        initialPhone={user.phoneNo || ''}
      />
    );
  }

  // Show password change form when Change password is clicked
  if (showPasswordForm) {
    return (
      <PasswordChangeForm
        onClose={handleClosePasswordForm}
        onSave={handleSavePassword}
      />
    );
  }

  // Show username change form when Change username is clicked
  if (showUsernameForm) {
    return (
      <UsernameChangeForm
        onClose={handleCloseUsernameForm}
        onSave={handleSaveUsername}
        currentUsername={user.username}
      />
    );
  }

  // Show email change form when Change email address is clicked
  if (showEmailForm) {
    return (
      <EmailChangeForm
        onClose={handleCloseEmailForm}
        onSave={handleSaveEmail}
        currentEmail={user.email}
      />
    );
  }

  // Show original credential form
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Message Display */}
      {message && (
        <div className={`p-3 rounded-md ${
          message.type === 'success' ? 'bg-green-500/20 border border-green-500 text-green-400' : 'bg-red-500/20 border border-red-500 text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      {/* Test Backend Connection Button */}
      <div className="flex justify-start mb-4">
        {/* <button
          onClick={handleTestBackendConnection}
          disabled={loading}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-800 text-white rounded-md text-sm font-medium transition-colors"
        >
          {loading ? 'Testing...' : 'Test Backend Connection'}
        </button> */}
      </div>

      {/* Email Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 space-y-2 sm:space-y-0">
          <label className="block text-sm sm:text-base lg:text-lg text-[#FFFFFF] font-medium">
            Email
          </label>
          <button 
            className="text-[#028EFC] text-xs sm:text-sm font-medium transition-colors self-start sm:self-auto"
            onClick={handleEmailChange}
          >
            Change email address
          </button>
        </div>
        <input
          type="email"
          value={user.email}
          readOnly
          className="w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base placeholder:text-lg sm:placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors "
        />
      </div>

      {/* Username Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 space-y-2 sm:space-y-0">
          <label className="block text-sm sm:text-base lg:text-lg text-[#FFFFFF] font-medium">
            Username
          </label>
          <button 
            className="text-[#028EFC] text-xs sm:text-sm font-medium transition-colors self-start sm:self-auto"
            onClick={handleUsernameChange}
          >
            Change username
          </button>
        </div>
        <input
          type="text"
          value={user.username}
          readOnly
          className="w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base placeholder:text-lg sm:placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors "
        />
      </div>

      {/* Password Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 space-y-2 sm:space-y-0">
          <label className="block text-sm sm:text-base lg:text-lg text-[#FFFFFF] font-medium">
            Password
          </label>
          <button 
            className="text-[#028EFC] text-xs sm:text-sm font-medium transition-colors self-start sm:self-auto"
            onClick={handlePasswordChange}
          >
            Change password
          </button>
        </div>
        <input
          type="password"
          value="••••••••"
          readOnly
          className="w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base placeholder:text-lg sm:placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors "
        />
      </div>

      {/* Phone Number Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 space-y-2 sm:space-y-0">
          <label className="block text-sm sm:text-base lg:text-lg text-[#FFFFFF] font-medium">
            Phone number
          </label>
          <button 
            className="text-[#028EFC] text-xs sm:text-sm font-medium transition-colors self-start sm:self-auto"
            onClick={handlePhoneChange}
          >
            {user.phoneNo ? 'Change phone number' : 'Add phone number'}
          </button>
        </div>
        <input
          type="tel"
          value={user.phoneNo || "No phone number added"}
          readOnly
          className="w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base placeholder:text-lg sm:placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors "
        />
      </div>

      {/* 2-Factor Authentication Section */}
      <div>
        
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end pt-4 sm:pt-6">
        <SaveButton 
          identifier="add-product-btn" 
          buttonText="Save Changes" 
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default CredentialTab; 
