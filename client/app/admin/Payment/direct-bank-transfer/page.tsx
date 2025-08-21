"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Savebutton from "../Savebutton";
import { Button } from "@/components/ui/button";

type BankAccount = {
  accountName: string;
  accountNumber: string;
  bankName: string;
};

export default function DirectBankTransferPage() {
  const router = useRouter();

  const [title, setTitle] = useState<string>("Direct bank transfer");
  const [accounts, setAccounts] = useState<BankAccount[]>([]);

  const addAccount = () => {
    setAccounts((prev) => [
      ...prev,
      { accountName: "", accountNumber: "", bankName: "" },
    ]);
  };

  const updateAccount = (
    index: number,
    field: keyof BankAccount,
    value: string
  ) => {
    setAccounts((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value } as BankAccount;
      return next;
    });
  };

  const removeAccount = (index: number) => {
    setAccounts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const payload = { method: "directBankTransfer", title, accounts };
    console.log("Saving:", payload);
    // TODO: integrate API when available
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-5xl ">
        <h1 className="text-3xl font-bold text-[#E5E5E5] mb-8">Payment Setting</h1>

        <div className="bg-[#0000004D]/30 border border-[#172D6D] backdrop-blur-[500px] rounded-2xl p-6 sm:p-8">
          {/* Header with Back */}
          <div className="mb-4">
            <button
              onClick={() => router.push("/admin/Payment")}
              className="text-[#AEB9E1] hover:text-white transition-colors"
            >
              ◀ Back
            </button>
          </div>

          {/* Section Title */}
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Direct bank transfer</h2>
          </div>

          {/* Title input */}
          <div className="mb-8">
            <label className="block text-white text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-[#028EFC] rounded-lg text-sm bg-transparent text-white placeholder:text-[#AEB9E1]"
              placeholder="Direct bank transfer"
            />
          </div>

          {/* Account details */}
          <div className="mb-8">
            <h3 className="text-white text-base font-semibold">Account Details</h3>
            <p className="text-[#AEB9E1] text-xs mb-3">
              Configure your bank account details.
            </p>

            {/* Mobile/Tablet Layout - Vertical columns */}
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
                        updateAccount(idx, "accountName", e.target.value)
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
                        updateAccount(idx, "accountNumber", e.target.value)
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
                        updateAccount(idx, "bankName", e.target.value)
                      }
                    />
                    <label className="block text-[#AEB9E1] text-xs mt-1">Bank Name</label>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button
                      type="button"
                      onClick={() => removeAccount(idx)}
                      className="bg-transparent text-[#FF6B6B] hover:bg-[#1b1f3c] border border-[#FF6B6B]/30 text-sm px-3 py-1"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              
              {/* Add Account Button for mobile/tablet */}
              <div className="flex justify-center pt-4">
                <Button
                  type="button"
                  onClick={addAccount}
                  className="bg-[#028EFC] text-white px-6 py-2 rounded-lg hover:bg-[#5FA3B6] text-sm"
                >
                  Add account
                </Button>
              </div>
            </div>

            {/* Desktop Layout - Table based */}
            <div className="hidden lg:block border border-[#172D6D] rounded-xl overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-4 gap-3 px-4 py-3 text-[#AEB9E1] text-sm border-b border-[#172D6D]">
                <div className="text-left">Account Name</div>
                <div className="text-left">Account Number</div>
                <div className="text-left">Bank Name</div>
                <div className="text-left">Actions</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#172D6D]">
                {accounts.length === 0 && (
                  <div className="px-4 py-6 text-[#AEB9E1] text-sm text-center">
                    No accounts added yet.
                    <div className="mt-4 flex justify-end">
                      <Button
                        type="button"
                        onClick={addAccount}
                        className="bg-[#028EFC] text-white px-4 py-2 rounded-lg hover:bg-[#5FA3B6] text-sm"
                      >
                        Add account
                      </Button>
                    </div>
                  </div>
                )}
                {accounts.map((acc, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-4 gap-3 px-4 py-4 items-center"
                  >
                    <input
                      className="px-3 py-2 bg-transparent border border-[#028EFC] rounded-md text-sm text-white placeholder:text-[#AEB9E1]/50"
                      placeholder="e.g. John Doe"
                      value={acc.accountName}
                      onChange={(e) =>
                        updateAccount(idx, "accountName", e.target.value)
                      }
                    />
                    <input
                      className="px-3 py-2 bg-transparent border border-[#028EFC] rounded-md text-sm text-white placeholder:text-[#AEB9E1]/50"
                      placeholder="e.g. 0123456789"
                      value={acc.accountNumber}
                      onChange={(e) =>
                        updateAccount(idx, "accountNumber", e.target.value)
                      }
                    />
                    <input
                      className="px-3 py-2 bg-transparent border border-[#028EFC] rounded-md text-sm text-white placeholder:text-[#AEB9E1]/50"
                      placeholder="e.g. ABC Bank"
                      value={acc.bankName}
                      onChange={(e) =>
                        updateAccount(idx, "bankName", e.target.value)
                      }
                    />
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={() => removeAccount(idx)}
                        className="bg-transparent text-[#FF6B6B] hover:bg-[#1b1f3c] border border-[#FF6B6B]/30 text-sm px-3 py-1"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Save */}
          <div className="flex justify-end">
            <Savebutton
              identifier="dbt-save-button"
              buttonText="Save Changes"
              onSubmit={handleSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


