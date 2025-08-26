"use client";

import React from 'react';

interface ShippingAddressTabProps {
  customer: {
    shippingInfo: {
      firstName: string;
      lastName: string;
      phoneNo: string;
      email: string;
      address: string;
      city: string;
      zipCode: string;
    };
  };
  editData: any;
  setEditData: (data: any) => void;
  isEditing: boolean;
}

const ShippingAddressTab: React.FC<ShippingAddressTabProps> = ({ customer, editData, setEditData, isEditing }) => {
  const handleInputChange = (field: string, value: string) => {
    if (isEditing) {
      setEditData((prev: any) => ({
        ...prev,
        shippingInfo: {
          ...prev.shippingInfo,
          [field]: value
        }
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* First Name and Last Name */}
      <div>
        <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
          First Name
        </label>
        <input
          type="text"
          value={editData.shippingInfo?.firstName || customer.shippingInfo.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          className={`w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors ${
            isEditing ? 'bg-[#1a2a5a]' : 'bg-transparent'
          }`}
          readOnly={!isEditing}
        />
      </div>
      <div>
        <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
          Last Name
        </label>
        <input
          type="text"
          value={editData.shippingInfo?.lastName || customer.shippingInfo.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          className={`w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors ${
            isEditing ? 'bg-[#1a2a5a]' : 'bg-transparent'
          }`}
          readOnly={!isEditing}
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
          Phone
        </label>
        <input
          type="tel"
          value={editData.shippingInfo?.phoneNo || customer.shippingInfo.phoneNo}
          onChange={(e) => handleInputChange('phoneNo', e.target.value)}
          className={`w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors ${
            isEditing ? 'bg-[#1a2a5a]' : 'bg-transparent'
          }`}
          readOnly={!isEditing}
        />
      </div>

      {/* Address */}
      <div>
        <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
          Address
        </label>
        <input
          type="text"
          value={editData.shippingInfo?.address || customer.shippingInfo.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className={`w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors ${
            isEditing ? 'bg-[#1a2a5a]' : 'bg-transparent'
          }`}
          readOnly={!isEditing}
        />
      </div>

      {/* City and State/Province */}
      <div>
        <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
          City
        </label>
        <input
          type="text"
          value={editData.shippingInfo?.city || customer.shippingInfo.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          className={`w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors ${
            isEditing ? 'bg-[#1a2a5a]' : 'bg-transparent'
          }`}
          readOnly={!isEditing}
        />
      </div>
      <div>
        <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
          State or province
        </label>
        <input
          type="text"
          value=""
          className={`w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors ${
            isEditing ? 'bg-[#1a2a5a]' : 'bg-transparent'
          }`}
          readOnly={!isEditing}
          disabled={true}
        />
      </div>

      {/* Zip Code */}
      <div>
        <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
          Zip Code
        </label>
        <input
          type="text"
          value={editData.shippingInfo?.zipCode || customer.shippingInfo.zipCode}
          onChange={(e) => handleInputChange('zipCode', e.target.value)}
          className={`w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors ${
            isEditing ? 'bg-[#1a2a5a]' : 'bg-transparent'
          }`}
          readOnly={!isEditing}
        />
      </div>
    </div>
  );
};

export default ShippingAddressTab; 