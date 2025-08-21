"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Savebutton from "../Savebutton";

export default function CashOnDeliveryPage() {
  const router = useRouter();

  const [title, setTitle] = useState<string>("Cash on delivery");
  const [description, setDescription] = useState<string>("Pay with cash upon delivery");

  const handleSave = () => {
    const payload = { method: "cashOnDelivery", title, description };
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
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Cash on delivery</h2>
          </div>

          {/* Title input */}
          <div className="mb-8">
            <label className="block text-white text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-[#028EFC] rounded-lg text-sm bg-transparent text-white placeholder:text-[#AEB9E1]"
              
            />
          </div>

          {/* Description input */}
          <div className="mb-8">
            <label className="block text-white text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-[#028EFC] rounded-lg text-sm bg-transparent text-white placeholder:text-[#AEB9E1] resize-none"
              
              rows={4}
            />
          </div>

          {/* Save */}
          <div className="flex justify-end">
            <Savebutton
              identifier="cod-save-button"
              buttonText="Save Changes"
              onSubmit={handleSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
