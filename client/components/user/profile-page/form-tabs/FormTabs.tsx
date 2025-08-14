"use client";

import React, { useState } from "react";

import CredentialForm from "./CredentialForm";
import ShippingForm from "./ShippingForm";
import OrderTable from "./OrderTable";

const FormTabs = () => {
  const [activeTab, setActiveTab] = useState("credential");

  const tabs = [
    { id: "credential", label: "Credential" },
    { id: "shipping", label: "Shipping Address" },
    { id: "order", label: "Order Details" },
  ];

  return (
    <div className="bg-foreground/10 mt-[3em] grid grid-cols-1 rounded-[1em] p-[1em] lg:grid-cols-10">
      <div className="border-r-foreground/30 relative border-r p-[1em] lg:col-span-3">
        <ul className="space-y-[1em]">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full rounded-[0.5em] border border-transparent px-[1em] py-[0.5em] text-left transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "hover:border-primary"
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-[1em] lg:col-span-7">
        {activeTab === "credential" && <CredentialForm />}
        {activeTab === "shipping" && <ShippingForm />}
        {activeTab === "order" && <OrderTable />}
      </div>
    </div>
  );
};

export default FormTabs;
