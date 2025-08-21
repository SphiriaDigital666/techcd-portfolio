"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { BankAccount } from "../types";

interface MobileAccountListProps {
  accounts: BankAccount[];
  onUpdateAccount: (index: number, field: keyof BankAccount, value: string) => void;
  onRemoveAccount: (index: number) => void;
  onAddAccount: () => void;
}

export default function MobileAccountList({
  accounts,
  onUpdateAccount,
  onRemoveAccount,
  onAddAccount,
}: MobileAccountListProps) {
  return (
    <div className="block lg:hidden space-y-4">
      {accounts.length === 0 && (
        <div className="px-4 py-6 text-[#AEB9E1] text-sm text-center border border-[#172D6D] rounded-lg">
          No accounts added yet.
        </div>
      )}
      {accounts.map((acc, idx) => (
        <div
          key={idx}
          className="border border-[#172D6D] rounded-lg p-4 space-y-4"
        >
          <div>
            <input
              className="w-full px-3 py-2 bg-transparent border border-[#028EFC] rounded-md text-sm text-white placeholder:text-[#AEB9E1]/50"
              placeholder="e.g. John Doe"
              value={acc.accountName}
              onChange={(e) =>
                onUpdateAccount(idx, "accountName", e.target.value)
              }
            />
            <label className="block text-[#AEB9E1] text-xs mt-1">Account Name</label>
          </div>
          <div>
            <input
              className="w-full px-3 py-2 bg-transparent border border-[#028EFC] rounded-md text-sm text-white placeholder:text-[#AEB9E1]/50"
              placeholder="e.g. 0123456789"
              value={acc.accountNumber}
              onChange={(e) =>
                onUpdateAccount(idx, "accountNumber", e.target.value)
              }
            />
            <label className="block text-[#AEB9E1] text-xs mt-1">Account Number</label>
          </div>
          <div>
            <input
              className="w-full px-3 py-2 bg-transparent border border-[#028EFC] rounded-md text-sm text-white placeholder:text-[#AEB9E1]/50"
              placeholder="e.g. ABC Bank"
              value={acc.bankName}
              onChange={(e) =>
                onUpdateAccount(idx, "bankName", e.target.value)
              }
            />
            <label className="block text-[#AEB9E1] text-xs mt-1">Bank Name</label>
          </div>
          <div className="flex justify-end pt-2 space-x-2">
            {/* View Icon */}
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center text-[#AEB9E1] hover:text-white hover:bg-[#1b1f3c] rounded-md transition-colors"
              title="View details"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="1.5" fill="none"/>
                <rect x="9" y="9" width="6" height="6" strokeWidth="1.5" fill="none"/>
              </svg>
            </button>
            
            {/* Edit Icon */}
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center text-[#AEB9E1] hover:text-white hover:bg-[#1b1f3c] rounded-md transition-colors"
              title="Edit account"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            
            {/* Delete Icon */}
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center text-[#AEB9E1] hover:text-white hover:bg-[#1b1f3c] rounded-md transition-colors"
              title="Delete account"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>
      ))}
      
      {/* Add Account Button for mobile/tablet */}
      <div className="flex justify-center pt-4">
        <Button
          type="button"
          onClick={onAddAccount}
          className="bg-[#028EFC] text-white px-6 py-2 rounded-lg hover:bg-[#5FA3B6] text-sm"
        >
          Add account
        </Button>
      </div>
    </div>
  );
}
