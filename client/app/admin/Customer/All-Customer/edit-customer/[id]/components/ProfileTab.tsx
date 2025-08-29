"use client";

import React, { useState } from 'react';
import SaveButton from './Savebutton';
import { FiEdit3 } from 'react-icons/fi';
import { updateCustomerProfile, Customer } from '../../../../../../../lib/api/customerApi';

interface ProfileTabProps {
  customer?: Customer;
  customerId?: string;
  onCustomerUpdate?: () => Promise<void>;
}

const ProfileTab = ({ customer, customerId, onCustomerUpdate }: ProfileTabProps) => {
  const [formData, setFormData] = useState({
    firstName: customer?.firstName || '',
    lastName: customer?.lastName || '',
    location: 'new-york', // Default value
    biography: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Update form data when customer prop changes
  React.useEffect(() => {
    if (customer) {
      setFormData(prev => ({
        ...prev,
        firstName: customer.firstName || '',
        lastName: customer.lastName || ''
      }));
    }
  }, [customer]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!customerId) {
      alert('Customer ID is required');
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      console.log('Saving customer profile with data:', formData);
      const result = await updateCustomerProfile(customerId, {
        firstName: formData.firstName,
        lastName: formData.lastName
      });
      console.log('Profile update result:', result);

      if (result.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        if (onCustomerUpdate) {
          await onCustomerUpdate();
        }
      } else {
        setMessage({ type: 'error', text: `Failed to update profile: ${result.message}` });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Message Display */}
      {message && (
        <div className={`p-3 rounded-md ${
          message.type === 'success' ? 'bg-green-500/20 border border-green-500 text-green-400' : 'bg-red-500/20 border border-red-500 text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      {/* Profile Avatar Section */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 p-1">
            <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-600">
                {customer ? `${customer.firstName?.charAt(0) || ''}${customer.lastName?.charAt(0) || ''}` : 'JB'}
              </span>
            </div>
          </div>
          <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#3B82F6] rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
            <FiEdit3 className="text-white text-sm" />
          </button>
        </div>
        <h2 className="text-xl font-bold text-white">
          {customer ? `${customer.firstName || ''} ${customer.lastName || ''}` : 'Customer Name'}
        </h2>
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
          <label className="block text-[17px] text-[#FFFFFF]  font-medium mb-2">
            Location
          </label>
          <div className="relative">
            <select 
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-4 py-1  border border-[#172D6D] rounded-xl  appearance-none focus:outline-none focus:border-[#3B82F6] transition-colors"
            >
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
            value={formData.biography}
            onChange={(e) => handleInputChange('biography', e.target.value)}
            className="w-full px-4 py-1 border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors resize-none"
            placeholder="Enter biography"
          />
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end pt-6">
        <SaveButton identifier="add-product-btn" buttonText="Save Changes" onClick={handleSave} disabled={loading} />
      </div>
    </div>
  );
};

export default ProfileTab; 