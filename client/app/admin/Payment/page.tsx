"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Savebutton from './Savebutton';
function PaymentPage() {
  const router = useRouter();
  const [paymentSettings, setPaymentSettings] = useState({
    directBankTransfer: false,
    cashOnDelivery: false,
    onlinePayments: false,
    freeShipping: false,
    courierCharge: ''
  });

  const handleToggleChange = (setting: string) => {
    setPaymentSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const handleCourierChargeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentSettings(prev => ({
      ...prev,
      courierCharge: e.target.value
    }));
  };

  const handleSaveChanges = () => {
    console.log('Saving payment settings:', paymentSettings);
    // Add your save logic here
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-4xl ">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-[#E5E5E5] mb-8">Payment Settings</h1>

        {/* Main Content Panel */}
        <div className="bg-[#0000004D]/30 border border-[#172D6D] backdrop-blur-[500px] rounded-2xl p-8">
          {/* Payment Setting Section */}
          <div className="mb-8">


            {/* Payment Options */}
            <div className="space-y-6">
              {/* Direct Bank Transfer */}
              <div className="grid grid-cols-1 sm:flex sm:items-center sm:justify-between p-4 rounded-lg gap-4 sm:gap-6 md:gap-8 xl:gap-10 2xl:gap-12">
                {/* Toggle Switch Column */}
                <div className="flex justify-center sm:justify-start">
                  <button
                    onClick={() => handleToggleChange('directBankTransfer')}
                    className={`relative inline-flex h-8 w-12 sm:h-7 sm:w-12 md:h-6 md:w-11 items-center rounded-full transition-colors ${paymentSettings.directBankTransfer ? 'bg-[#028EFC]' : 'bg-[#4A5568]'
                      }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 sm:h-5 sm:w-5 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${paymentSettings.directBankTransfer ? 'translate-x-6 sm:translate-x-7 md:translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>

                {/* Option Details Column */}
                <div className="text-center sm:text-left">
                  <h3 className="text-white font-semibold text-lg">Direct bank transfer</h3>
                  <p className="text-[#AEB9E1] text-sm">
                    Take payments in person via BACS. More commonly known as direct bank/wire transfer.
                  </p>
                </div>

                {/* Manage Button Column */}
                <div className="flex justify-center sm:justify-end">
                  <button
                    onClick={() => router.push('/admin/Payment/direct-bank-transfer')}
                    className="bg-[#028EFC] text-white px-4 py-1 rounded-lg transition-colors "
                  >
                    Manage
                  </button>
                </div>
              </div>

                                                           {/* Cash on Delivery */}
               <div className="grid grid-cols-1 sm:flex sm:items-center sm:justify-between p-4 rounded-lg gap-4 sm:gap-6 md:gap-8 xl:gap-10 2xl:gap-12">
                 {/* Toggle Switch Column */}
                 <div className="flex justify-center sm:justify-start">
                                     <button
                     onClick={() => handleToggleChange('cashOnDelivery')}
                     className={`relative inline-flex h-8 w-12 sm:h-7 sm:w-12 md:h-6 md:w-11 items-center rounded-full transition-colors ${paymentSettings.cashOnDelivery ? 'bg-[#028EFC]' : 'bg-[#4A5568]'
                       }`}
                   >
                     <span
                       className={`inline-block h-6 w-6 sm:h-5 sm:w-5 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${paymentSettings.cashOnDelivery ? 'translate-x-6 sm:translate-x-7 md:translate-x-6' : 'translate-x-1'
                         }`}
                     />
                   </button>
                </div>

                {/* Option Details Column */}
                <div className="text-center sm:text-left">
                  <h3 className="text-white font-semibold text-lg">Cash on delivery</h3>
                  <p className="text-[#AEB9E1] text-sm">
                    Give your customers the convenience of paying directly from their credit or debit cards.
                  </p>
                </div>

                 {/* Manage Button Column */}
                 <div className="flex justify-center sm:justify-end">
                   <button 
                     onClick={() => router.push('/admin/Payment/cash-on-delivery')}
                     className="bg-[#028EFC] text-white px-4 py-1 rounded-lg transition-colors "
                   >
                     Manage
                   </button>
                 </div>
               </div>

              {/* Online Payments */}
              <div className="grid grid-cols-1 sm:flex sm:items-center p-4 rounded-lg gap-4 sm:gap-6 md:gap-8 xl:gap-10 2xl:gap-12">
                {/* Toggle Switch Column */}
                <div className="flex justify-center sm:justify-start">
                  <button
                    onClick={() => handleToggleChange('onlinePayments')}
                    className={`relative inline-flex h-8 w-12 sm:h-7 sm:w-12 md:h-6 md:w-11 items-center rounded-full transition-colors ${paymentSettings.onlinePayments ? 'bg-[#028EFC]' : 'bg-[#4A5568]'
                      }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 sm:h-5 sm:w-5 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${paymentSettings.onlinePayments ? 'translate-x-6 sm:translate-x-7 md:translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>

                {/* Option Details Column */}
                <div className="text-center sm:text-left">
                  <h3 className="text-white font-semibold text-lg">Online payments</h3>
                  <p className="text-[#AEB9E1] text-sm">
                    Give your customers the convenience of paying directly from their credit or debit cards.
                  </p>
                </div>
              </div>

              {/* Free Shipping */}
              <div className="grid grid-cols-1 sm:flex sm:items-center p-4 rounded-lg gap-4 sm:gap-6 md:gap-8 xl:gap-10 2xl:gap-12">
                {/* Toggle Switch Column */}
                <div className="flex justify-center sm:justify-start">
                  <button
                    onClick={() => handleToggleChange('freeShipping')}
                    className={`relative inline-flex h-8 w-12 sm:h-7 sm:w-12 md:h-6 md:w-11 items-center rounded-full transition-colors ${paymentSettings.freeShipping ? 'bg-[#028EFC]' : 'bg-[#4A5568]'
                      }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 sm:h-5 sm:w-5 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${paymentSettings.freeShipping ? 'translate-x-6 sm:translate-x-7 md:translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>

                {/* Option Details Column */}
                <div className="text-center sm:text-left">
                  <h3 className="text-white font-semibold text-lg">Free Shipping</h3>
                  <p className="text-[#AEB9E1] text-sm">
                    Give your customers the convenience of paying directly from their credit or debit cards.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Courier Setting Section - Hidden when Free Shipping is enabled */}
          {!paymentSettings.freeShipping && (
            <div className="mb-8 p-4">
              <h2 className="text-2xl font-bold text-white mb-6">Courier Setting</h2>

              {/* Courier Charge Input */}
              <div className='border border-[#028EFC] rounded-lg p-6'>
                <label className="block text-white text-sm font-medium mb-2">
                  Courier Charge
                </label>
                <input
                  type="text"
                  value={paymentSettings.courierCharge}
                  onChange={handleCourierChargeChange}
                  className="w-full px-4 py-3  border border-[#028EFC] rounded-lg text-sm transition-all"
                />
              </div>
            </div>
          )}

          {/* Save Changes Button */}
          <div className="flex justify-end">
            <Savebutton
              identifier=""
              buttonText="Save Changes"
              onSubmit={handleSaveChanges}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
