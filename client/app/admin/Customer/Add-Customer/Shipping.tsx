"use client";

import React from 'react';

interface ShippingProps {
  formData: {
    shippingFirstName: string;
    shippingLastName: string;
    shippingPhone: string;
    shippingEmail: string;
    state: string;
    address: string;
    city: string;
    zipCode: string;
  };
  onInputChange: (field: string, value: string) => void;
  getFieldError?: (field: string) => string | null;
}

const Shipping: React.FC<ShippingProps> = ({ formData, onInputChange, getFieldError }) => {
  return (
    <div>
      <h3 className="xl:text-[32px] text-[24px] font-semibold text-[#E5E5E5] mb-6">Shipping Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[#FFFFFF] text-[17px] mb-2">
            First Name
            {formData.shippingFirstName && (
              <span className="text-sm text-gray-400 ml-2">
                ({formData.shippingFirstName.length}/2 min)
              </span>
            )}
          </label>
          <input
            type="text"
            value={formData.shippingFirstName}
            onChange={(e) => onInputChange('shippingFirstName', e.target.value)}
            className={`w-full px-4 xl:py-1 py-2 border rounded-md text-white focus:outline-none ${
              getFieldError && getFieldError('shippingFirstName') 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-[#172D6D] focus:border-[#028EFC]'
            }`}
            placeholder="Enter shipping first name (min 2 characters)"
            required
          />
          {getFieldError && getFieldError('shippingFirstName') && (
            <p className="text-red-400 text-sm mt-1">{getFieldError('shippingFirstName')}</p>
          )}
        </div>
        <div>
          <label className="block text-[#FFFFFF] text-[17px] mb-2">
            Last Name
            {formData.shippingLastName && (
              <span className="text-sm text-gray-400 ml-2">
                ({formData.shippingLastName.length}/2 min)
              </span>
            )}
          </label>
          <input
            type="text"
            value={formData.shippingLastName}
            onChange={(e) => onInputChange('shippingLastName', e.target.value)}
            className={`w-full px-4 xl:py-1 py-2 border rounded-md text-white focus:outline-none ${
              getFieldError && getFieldError('shippingLastName') 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-[#172D6D] focus:border-[#028EFC]'
            }`}
            placeholder="Enter shipping last name (min 2 characters)"
            required
          />
          {getFieldError && getFieldError('shippingLastName') && (
            <p className="text-red-400 text-sm mt-1">{getFieldError('shippingLastName')}</p>
          )}
        </div>
        <div>
          <label className="block text-[#FFFFFF] text-[17px] mb-2">Phone number</label>
          <input
            type="tel"
            value={formData.shippingPhone}
            onChange={(e) => onInputChange('shippingPhone', e.target.value)}
            className={`w-full px-4 xl:py-1 py-2 border rounded-md text-white focus:outline-none ${
              getFieldError && getFieldError('shippingPhone') 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-[#172D6D] focus:border-[#028EFC]'
            }`}
            placeholder="e.g., +1234567890 (no spaces)"
            required
          />
          {getFieldError && getFieldError('shippingPhone') && (
            <p className="text-red-400 text-sm mt-1">{getFieldError('shippingPhone')}</p>
          )}
        </div>
        <div>
          <label className="block text-[#FFFFFF] text-[17px] mb-2">Email</label>
          <input
            type="email"
            value={formData.shippingEmail}
            onChange={(e) => onInputChange('shippingEmail', e.target.value)}
            className={`w-full px-4 xl:py-1 py-2 border rounded-md text-white focus:outline-none ${
              getFieldError && getFieldError('shippingEmail') 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-[#172D6D] focus:border-[#028EFC]'
            }`}
            required
          />
          {getFieldError && getFieldError('shippingEmail') && (
            <p className="text-red-400 text-sm mt-1">{getFieldError('shippingEmail')}</p>
          )}
        </div>
        <div>
          <label className="block text-[#FFFFFF] text-[17px] mb-2">
            State
            {formData.state && (
              <span className="text-sm text-gray-400 ml-2">
                ({formData.state.length}/2 min)
              </span>
            )}
          </label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => onInputChange('state', e.target.value)}
            className={`w-full px-4 xl:py-1 py-2 border rounded-md text-white focus:outline-none ${
              getFieldError && getFieldError('state') 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-[#172D6D] focus:border-[#028EFC]'
            }`}
            placeholder="Enter state (min 2 characters)"
            required
          />
          {getFieldError && getFieldError('state') && (
            <p className="text-red-400 text-sm mt-1">{getFieldError('state')}</p>
          )}
        </div>
        <div>
          <label className="block text-[#FFFFFF] text-[17px] mb-2">
            City
            {formData.city && (
              <span className="text-sm text-gray-400 ml-2">
                ({formData.city.length}/2 min)
              </span>
            )}
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => onInputChange('city', e.target.value)}
            className={`w-full px-4 xl:py-1 py-2 border rounded-md text-white focus:outline-none ${
              getFieldError && getFieldError('city') 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-[#172D6D] focus:border-[#028EFC]'
            }`}
            placeholder="Enter city (min 2 characters)"
            required
          />
          {getFieldError && getFieldError('city') && (
            <p className="text-red-400 text-sm mt-1">{getFieldError('city')}</p>
          )}
        </div>
        <div>
          <label className="block text-[#FFFFFF] text-[17px] mb-2">Zip Code</label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => onInputChange('zipCode', e.target.value)}
            className={`w-full px-4 xl:py-1 py-2 border rounded-md text-white focus:outline-none ${
              getFieldError && getFieldError('zipCode') 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-[#028EFC] focus:border-[#028EFC]'
            }`}
            placeholder="e.g., 12345 (5 digits)"
            required
          />
          {getFieldError && getFieldError('zipCode') && (
            <p className="text-red-400 text-sm mt-1">{getFieldError('zipCode')}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-[#FFFFFF] text-[17px] mb-2">
            Address
            {formData.address && (
              <span className="text-sm text-gray-400 ml-2">
                ({formData.address.length}/5 min)
              </span>
            )}
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => onInputChange('address', e.target.value)}
            rows={3}
            className={`w-full px-4 xl:py-1 py-2 border rounded-md text-white focus:outline-none resize-none ${
              getFieldError && getFieldError('address') 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-[#172D6D] focus:border-[#028EFC]'
            }`}
            placeholder="Enter full address (min 5 characters)"
            required
          />
          {getFieldError && getFieldError('address') && (
            <p className="text-red-400 text-sm mt-1">{getFieldError('address')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shipping;
