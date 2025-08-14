"use client";

import React from "react";

import CredentialForm from "./CredentialForm";
import ShippingForm from "./ShippingForm";
import OrderTable from "./OrderTable";

const FormTabs = () => {
  return (
    <div className="bg-foreground/10 mt-[3em] grid grid-cols-1 rounded-[1em] p-[1em] lg:grid-cols-10">
      <div className="border-r-foreground/30 relative border-r p-[1em] lg:col-span-3">
        <ul className="space-y-[1em]">
          <li>
            <button className="bg-primary w-full rounded-[0.5em] px-[1em] py-[0.5em] text-left">
              Credential
            </button>
          </li>
          <li>
            <button className="w-full rounded-[0.5em] px-[1em] py-[0.5em] text-left">
              Shipping Address
            </button>
          </li>
          <li>
            <button className="w-full rounded-[0.5em] px-[1em] py-[0.5em] text-left">
              Order Details
            </button>
          </li>
        </ul>
      </div>

      <div className="p-[1em] lg:col-span-7">
        <CredentialForm />
        <ShippingForm />
        <OrderTable />
      </div>
    </div>
  );
};

export default FormTabs;
