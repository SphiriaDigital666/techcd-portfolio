"use client";

import React, { useState } from 'react';
import SaveButton from './Savebutton';
import { updateCustomerAddress, Customer } from '../../../../../../../lib/api/customerApi';

interface ShippingAddressTabProps {
  customer?: Customer;
  customerId?: string;
  onCustomerUpdate?: () => Promise<void>;
}

const ShippingAddressTab = ({ customer, customerId, onCustomerUpdate }: ShippingAddressTabProps) => {
  const [formData, setFormData] = useState({
    firstName: customer?.shippingInfo?.firstName || '',
    lastName: customer?.shippingInfo?.lastName || '',
    phone: customer?.shippingInfo?.phoneNo || '',
    email: customer?.shippingInfo?.email || '',
    address: customer?.shippingInfo?.address || '',
    city: customer?.shippingInfo?.city || '',
    state: customer?.shippingInfo?.state || '',
    zipCode: customer?.shippingInfo?.zipCode || '',
    country: customer?.shippingInfo?.country || 'US'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Update form data when customer prop changes
  React.useEffect(() => {
    if (customer) {
      setFormData(prev => ({
        ...prev,
        firstName: customer.shippingInfo?.firstName || '',
        lastName: customer.shippingInfo?.lastName || '',
        phone: customer.shippingInfo?.phoneNo || '',
        email: customer.shippingInfo?.email || '',
        address: customer.shippingInfo?.address || '',
        city: customer.shippingInfo?.city || '',
        state: customer.shippingInfo?.state || '',
        zipCode: customer.shippingInfo?.zipCode || '',
        country: customer.shippingInfo?.country || 'US'
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

      console.log('Saving customer address with data:', formData);
      const result = await updateCustomerAddress(customerId, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNo: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      });
      console.log('Address update result:', result);

      if (result.success) {
        setMessage({ type: 'success', text: 'Shipping address updated successfully!' });
        if (onCustomerUpdate) {
          await onCustomerUpdate();
        }
      } else {
        setMessage({ type: 'error', text: `Failed to update address: ${result.message}` });
      }
    } catch (error) {
      console.error('Error updating address:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to update address' });
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

      {/* First Name and Last Name */}
      <div className="space-y-4">
        <div>
          <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
            placeholder="Enter last name"
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
          Phone
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
          placeholder="Enter phone number"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
          placeholder="Enter email address"
        />
      </div>

      {/* Address */}
      <div>
        <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
          Address
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
          placeholder="Enter street address"
        />
      </div>

      {/* City and State/Province */}
      <div className="space-y-4">
        <div>
          <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
            City
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
            placeholder="Enter city"
          />
        </div>
        <div>
          <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
            State or province
          </label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
            placeholder="Enter state or province"
          />
        </div>
      </div>

      {/* Zip Code */}
      <div>
        <label className="block text-[17px] font-medium text-[#FFFFFF] mb-2">
          Zip Code
        </label>
        <input
          type="text"
          value={formData.zipCode}
          onChange={(e) => handleInputChange('zipCode', e.target.value)}
          className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
          placeholder="Enter zip code"
        />
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end pt-6">
        <SaveButton identifier="add-product-btn" buttonText="Save Changes" onClick={handleSave} disabled={loading} />
      </div>
    </div>
  );
};

export default ShippingAddressTab; 