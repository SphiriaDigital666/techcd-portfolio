"use client";

import React from 'react';
import SaveButton from './Savebutton';
const ShippingAddressTab = () => {
  return (
    <div className="space-y-6">
      {/* First Name and Last Name */}
      
        <div>
          <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
            First Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
            
          />
        </div>
        <div>
          <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
            Last Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
           
          />
        </div>
    

      {/* Phone */}
      <div>
        <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
          Phone
        </label>
        <input
          type="tel"
          className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
         
        />
      </div>

      {/* Address */}
      <div>
        <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
          Address
        </label>
        <input
          type="text"
          className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
         
        />
      </div>

      {/* City and State/Province */}
      
        <div>
          <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
            City
          </label>
          <input
            type="text"
            className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
          
          />
        </div>
        <div>
          <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
            State or province
          </label>
          <input
            type="text"
            className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
          
          />
        </div>
      

      {/* Zip Code */}
      <div>
        <label className="block text-[17px]  text-[#FFFFFF] font-medium  mb-2">
          Zip Code
        </label>
        <input
          type="text"
          className="w-full px-4 py-1 placeholder:text-xl border border-[#172D6D] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] transition-colors"
        
        />
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end pt-6">
      <SaveButton identifier="add-product-btn" buttonText="Save Changes" />
      </div>
    </div>
  );
};

export default ShippingAddressTab; 