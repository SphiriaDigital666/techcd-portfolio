"use client";

import React, { useState } from 'react';
import SaveButton from './Savebutton';
import TwoFASidebar from './TwoFASidebar';
import PhoneNumberForm from './PhoneNumberForm';
import PasswordChangeForm from './PasswordChangeForm';
import UsernameChangeForm from './UsernameChangeForm';
import EmailChangeForm from './EmailChangeForm';
import { 
  updateCustomerEmail, 
  updateCustomerPassword, 
  updateCustomerUsername, 
  updateCustomerPhone,
  Customer 
} from '../../../../../../../lib/api/customerApi';

interface CredentialTabProps {
  customer?: Customer;
  customerId?: string;
  onCustomerUpdate?: () => Promise<void>;
}

const CredentialTab = ({ customer, customerId, onCustomerUpdate }: CredentialTabProps) => {
  const [show2FASidebar, setShow2FASidebar] = useState(false);
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showUsernameForm, setShowUsernameForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [selected2FA, setSelected2FA] = useState('none');
  const [phoneData, setPhoneData] = useState({ countryCode: 'US +1', phoneNumber: customer?.phoneNo || '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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
    if (!customerId) {
      alert('Customer ID is required');
      return;
    }

    try {
      setLoading(true);
      setMessage(null);
      
      console.log('Saving customer phone number with data:', { ...data, currentPassword: '***' });
      const result = await updateCustomerPhone(customerId, data.phoneNumber, data.currentPassword);
      console.log('Phone update result:', result);
      
      if (result.success) {
        setPhoneData({ countryCode: data.countryCode, phoneNumber: data.phoneNumber });
        setMessage({ type: 'success', text: 'Phone number updated successfully!' });
        if (onCustomerUpdate) {
          await onCustomerUpdate();
        }
      } else {
        setMessage({ type: 'error', text: `Failed to update phone number: ${result.message}` });
      }
    } catch (error) {
      console.error('Error updating phone number:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to update phone number' });
    } finally {
      setLoading(false);
      setShowPhoneForm(false);
    }
  };

  const handleSavePassword = async (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
    if (!customerId) {
      alert('Customer ID is required');
      return;
    }

    try {
      setLoading(true);
      setMessage(null);
      
      console.log('Saving customer password with data:', { currentPassword: '***', newPassword: '***' });
      const result = await updateCustomerPassword(customerId, data.currentPassword, data.newPassword);
      console.log('Password update result:', result);
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Password updated successfully!' });
        if (onCustomerUpdate) {
          await onCustomerUpdate();
        }
      } else {
        setMessage({ type: 'error', text: `Failed to update password: ${result.message}` });
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to update password' });
    } finally {
      setLoading(false);
      setShowPasswordForm(false);
    }
  };

  const handleSaveUsername = async (data: { newUsername: string; currentPassword: string }) => {
    if (!customerId) {
      alert('Customer ID is required');
      return;
    }

    try {
      setLoading(true);
      setMessage(null);
      
      console.log('Saving customer username with data:', { newUsername: data.newUsername, currentPassword: '***' });
      const result = await updateCustomerUsername(customerId, data.newUsername, data.currentPassword);
      console.log('Username update result:', result);
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Username updated successfully!' });
        if (onCustomerUpdate) {
          await onCustomerUpdate();
        }
      } else {
        setMessage({ type: 'error', text: `Failed to update username: ${result.message}` });
      }
    } catch (error) {
      console.error('Error updating username:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to update username' });
    } finally {
      setLoading(false);
      setShowUsernameForm(false);
    }
  };

  const handleSaveEmail = async (data: { newEmail: string; currentPassword: string }) => {
    if (!customerId) {
      alert('Customer ID is required');
      return;
    }

    try {
      setLoading(true);
      setMessage(null);
      
      console.log('Saving customer email with data:', { newEmail: data.newEmail, currentPassword: '***' });
      const result = await updateCustomerEmail(customerId, data.newEmail, data.currentPassword);
      console.log('Email update result:', result);
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Email updated successfully!' });
        if (onCustomerUpdate) {
          await onCustomerUpdate();
        }
      } else {
        setMessage({ type: 'error', text: `Failed to update email: ${result.message}` });
      }
    } catch (error) {
      console.error('Error updating email:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to update email' });
    } finally {
      setLoading(false);
      setShowEmailForm(false);
    }
  };

  // Show 2FA options when Change button is clicked
  if (show2FASidebar) {
    return (
      <TwoFASidebar
        isOpen={show2FASidebar}
        onClose={handleCloseSidebar}
        selected2FA={selected2FA}
        onSelect2FA={setSelected2FA}
        onSave={handleSave2FA}
      />
    );
  }

  // Show phone number form when Add phone number is clicked
  if (showPhoneForm) {
    return (
      <PhoneNumberForm
        onClose={handleClosePhoneForm}
        onSave={handleSavePhone}
        initialPhone={customer?.phoneNo || ''}
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
        currentUsername={customer?.username || ''}
      />
    );
  }

  // Show email change form when Change email address is clicked
  if (showEmailForm) {
    return (
      <EmailChangeForm
        onClose={handleCloseEmailForm}
        onSave={handleSaveEmail}
        currentEmail={customer?.email || ''}
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
          value={customer?.email || ''}
          readOnly
          className="w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base placeholder:text-lg sm:placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-gray-700/30"
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
          value={customer?.username || ''}
          readOnly
          className="w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base placeholder:text-lg sm:placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-gray-700/30"
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
          className="w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base placeholder:text-lg sm:placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-gray-700/30"
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
            {customer?.phoneNo ? 'Change phone number' : 'Add phone number'}
          </button>
        </div>
        <input
          type="tel"
          value={customer?.phoneNo || "No phone number added"}
          readOnly
          className="w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base placeholder:text-lg sm:placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-gray-700/30"
        />
      </div>

      {/* 2-Factor Authentication Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 space-y-2 sm:space-y-0">
          <label className="block text-sm sm:text-base lg:text-lg text-[#FFFFFF] font-medium">
            2-factor authentication
          </label>
          <button 
            className="text-[#028EFC] text-xs sm:text-sm font-medium transition-colors self-start sm:self-auto"
            onClick={handle2FAChange}
          >
            Change
          </button>
        </div>
        <input
          type="text"
          className="w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base placeholder:text-lg sm:placeholder:text-xl border border-[#172D6D] rounded-xl text-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
          placeholder={selected2FA === 'none' ? 'None' : 'Email Verification'}
          disabled
        />
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end pt-4 sm:pt-6">
        <SaveButton identifier="add-product-btn" buttonText="Save Changes" disabled={loading} />
      </div>
    </div>
  );
};

export default CredentialTab; 
