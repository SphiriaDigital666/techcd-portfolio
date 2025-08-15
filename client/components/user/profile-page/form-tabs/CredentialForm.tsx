"use client";

import React, { useState } from "react";

import TelSubForm from "./TelSubForm";
import NameSubForm from "./NameSubForm";

const CredentialForm = () => {
  const [activeSubForm, setActiveSubForm] = useState("name");

  return (
    <>
      {activeSubForm === "name" && (
        <NameSubForm setActiveSubForm={setActiveSubForm} />
      )}
      {activeSubForm === "email" && (
        <TelSubForm handleClose={() => setActiveSubForm("name")} />
      )}
    </>
  );
};

export default CredentialForm;
