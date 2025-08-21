"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type BankAccount = {
  accountName: string;
  accountNumber: string;
  bankName: string;
};

interface DesktopAccountTableProps {
  accounts: BankAccount[];
  onUpdateAccount: (index: number, field: keyof BankAccount, value: string) => void;
  onRemoveAccount: (index: number) => void;
  onAddAccount: () => void;
}

export default function DesktopAccountTable({
  accounts,
  onUpdateAccount,
  onRemoveAccount,
  onAddAccount,
}: DesktopAccountTableProps) {
  return (
    <div className="hidden lg:block border border-[#172D6D] rounded-xl overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-4 gap-3 px-4 py-3 text-[#AEB9E1] text-sm border-b border-[#172D6D]">
        <div className="text-left">Account Name</div>
        <div className="text-left">Account Number</div>
        <div className="text-left">Bank Name</div>
        <div className="text-left flex justify-end">
          <Button
            type="button"
            onClick={onAddAccount}
            className="bg-[#028EFC] text-white px-3 py-1 rounded-lg hover:bg-[#5FA3B6] text-sm"
          >
            Add account
          </Button>
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-[#172D6D]">
        {accounts.length === 0 && (
          <div className="px-4 py-6 text-[#AEB9E1] text-sm text-center">
            No accounts added yet.
          </div>
        )}
        {accounts.map((acc, idx) => (
          <div
            key={idx}
            className="grid grid-cols-4 gap-3 px-4 py-4 items-center"
          >
            <input
              className="px-3 py-2 bg-transparent text-sm text-white placeholder:text-[#AEB9E1]/50"
              placeholder="e.g. John Doe"
              value={acc.accountName}
              onChange={(e) =>
                onUpdateAccount(idx, "accountName", e.target.value)
              }
            />
            <input
              className="px-3 py-2 bg-transparent text-sm text-white placeholder:text-[#AEB9E1]/50"
              placeholder="e.g. 0123456789"
              value={acc.accountNumber}
              onChange={(e) =>
                onUpdateAccount(idx, "accountNumber", e.target.value)
              }
            />
            <input
              className="px-3 py-2 bg-transparent text-sm text-white placeholder:text-[#AEB9E1]/50"
              placeholder="e.g. ABC Bank"
              value={acc.bankName}
              onChange={(e) =>
                onUpdateAccount(idx, "bankName", e.target.value)
              }
            />
            <div className="flex justify-end space-x-2">
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
      </div>
    </div>
  );
}
