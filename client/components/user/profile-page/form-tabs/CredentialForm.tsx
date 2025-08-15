"use client";

import React, { useState } from "react";

import TelSubForm from "./TelSubForm";
import NameSubForm from "./NameSubForm";
import PasswordSubForm from "./PasswordSubForm";

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
      {activeSubForm === "password" && (
        <PasswordSubForm handleClose={() => setActiveSubForm("name")} />
      )}
    </>
  );
};

export default CredentialForm;
