"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Savebutton from "../Savebutton";
import AccountForm from "./components/AccountForm";
import MobileAccountList from "./components/MobileAccountList";
import DesktopAccountTable from "./components/DesktopAccountTable";
import { BankAccount } from "./types";

export default function DirectBankTransferPage() {
  const router = useRouter();

  const [title, setTitle] = useState<string>("Direct bank transfer");
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      accountName: "John Doe",
      accountNumber: "1234567890",
      bankName: "ABC Bank"
    },
    {
      accountName: "Jane Smith",
      accountNumber: "0987654321",
      bankName: "XYZ Bank"
    },
    {
      accountName: "Business Account",
      accountNumber: "55556666",
      bankName: "Corporate Bank"
    }
  ]);

  // Log the accounts data when component mounts
  useEffect(() => {
    console.log("Accounts loaded:", accounts);
    console.log("Number of accounts:", accounts.length);
  }, [accounts]);

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

          {/* Title Form Component */}
          <AccountForm title={title} onTitleChange={setTitle} />

          {/* Account details */}
          <div className="mb-8">
            <h3 className="text-white text-base font-semibold">Account Details</h3>
            <p className="text-[#AEB9E1] text-xs mb-3">
              Configure your bank account details.
            </p>

            {/* Mobile/Tablet Layout Component */}
            <MobileAccountList
              accounts={accounts}
              onUpdateAccount={updateAccount}
              onRemoveAccount={removeAccount}
              onAddAccount={addAccount}
            />

            {/* Desktop Layout Component */}
            <DesktopAccountTable
              accounts={accounts}
              onUpdateAccount={updateAccount}
              onRemoveAccount={removeAccount}
              onAddAccount={addAccount}
            />
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


