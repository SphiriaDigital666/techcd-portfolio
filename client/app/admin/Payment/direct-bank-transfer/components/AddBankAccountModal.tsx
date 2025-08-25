"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Savebutton from './Savebutton'
interface BankAccount {
  accountName: string;
  accountNumber: string;
  bankName: string;
  country: string;
  branch: string;
}

interface AddBankAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (account: BankAccount) => void;
}

export default function AddBankAccountModal({
  isOpen,
  onClose,
  onSave,
}: AddBankAccountModalProps) {
  const [formData, setFormData] = useState<BankAccount>({
    accountName: "",
    accountNumber: "",
    bankName: "",
    country: "Sri Lanka",
    branch: "",
  });

  const handleInputChange = (field: keyof BankAccount, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      accountName: "",
      accountNumber: "",
      bankName: "",
      country: "Sri Lanka",
      branch: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-[#00000033]/30 backdrop-blur-[500px] border border-[#172D6D] rounded-xl p-6 w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-semibold">Add a bank account</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-[#172D6D] text-white left-1 rounded-full flex items-center justify-center hover:bg-[#2a3f7a] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Country */}
              <div>
                <label className="block text-[#FFFFFF] text-sm mb-2">Country</label>
                <div className="relative">
                  <select
                    value={formData.country}
                    onChange={(e) => handleInputChange("country", e.target.value)}
                    className="w-full px-3 py-2 border border-[#172D6D] rounded-md text-white text-sm focus:outline-none focus:border-[#028EFC] appearance-none"
                  >
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bank Name */}
              <div>
                <label className="block text-[#FFFFFF] text-sm mb-2">Bank Name</label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange("bankName", e.target.value)}
                  className="w-full px-3 py-2  border border-[#172D6D] rounded-md text-white text-sm placeholder:text-[#AEB9E1]/50 focus:outline-none focus:border-[#028EFC]"
                
                />
              </div>

              {/* Account Number */}
              <div>
                <label className="block text-[#FFFFFF] text-sm mb-2">Account Number</label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                  className="w-full px-3 py-2  border border-[#172D6D] rounded-md text-white text-sm placeholder:text-[#AEB9E1]/50 focus:outline-none focus:border-[#028EFC]"
              
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Account Name */}
              <div>
                <label className="block text-[#FFFFFF] text-sm mb-2">Account Name</label>
                <input
                  type="text"
                  value={formData.accountName}
                  onChange={(e) => handleInputChange("accountName", e.target.value)}
                  className="w-full px-3 py-2  border border-[#172D6D] rounded-md text-white text-sm placeholder:text-[#AEB9E1]/50 focus:outline-none focus:border-[#028EFC]"
              
                />
              </div>

              {/* Branch */}
              <div>
                <label className="block text-[#FFFFFF] text-sm mb-2">Branch</label>
                <input
                  type="text"
                  value={formData.branch}
                  onChange={(e) => handleInputChange("branch", e.target.value)}
                  className="w-full px-3 py-2  border border-[#172D6D] rounded-md text-white text-sm placeholder:text-[#AEB9E1]/50 focus:outline-none focus:border-[#028EFC]"
                
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Savebutton
              identifier="dbt-save-button"
              buttonText="Save Account"
              onSubmit={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
