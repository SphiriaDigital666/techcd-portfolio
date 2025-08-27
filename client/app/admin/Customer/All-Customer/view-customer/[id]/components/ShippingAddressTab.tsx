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
      state: string;
      zipCode: string;
    };
  };
}

const ShippingAddressTab: React.FC<ShippingAddressTabProps> = ({ customer }) => {
  return (
    <div className="space-y-6">
      {/* First Name and Last Name */}
      <div>
        <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
          First Name
        </label>
        <input
          type="text"
          value={customer.shippingInfo.firstName}
          className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-transparent"
          readOnly
        />
      </div>
      <div>
        <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
          Last Name
        </label>
        <input
          type="text"
          value={customer.shippingInfo.lastName}
          className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-transparent"
          readOnly
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
          Phone
        </label>
        <input
          type="tel"
          value={customer.shippingInfo.phoneNo}
          className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-transparent"
          readOnly
        />
      </div>

      {/* Address */}
      <div>
        <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
          Address
        </label>
        <input
          type="text"
          value={customer.shippingInfo.address}
          className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-transparent"
          readOnly
        />
      </div>

      {/* City and State/Province */}
      <div>
        <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
          City
        </label>
        <input
          type="text"
          value={customer.shippingInfo.city}
          className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-transparent"
          readOnly
        />
      </div>
      <div>
        <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
          State or province
        </label>
        <input
          type="text"
          value={customer.shippingInfo.state || ''}
          className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-transparent"
          readOnly
        />
      </div>

      {/* Zip Code */}
      <div>
        <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
          Zip Code
        </label>
        <input
          type="text"
          value={customer.shippingInfo.zipCode}
          className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-transparent"
          readOnly
        />
      </div>
    </div>
  );
};

export default ShippingAddressTab; 