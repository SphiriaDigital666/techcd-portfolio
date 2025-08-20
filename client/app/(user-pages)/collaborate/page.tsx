import React from "react";

import Header from "@/components/user/collaborate-page/header/Header";
import Story from "@/components/user/collaborate-page/story/Story";
import Why from "@/components/user/collaborate-page/why/Why";
import Who from "@/components/user/collaborate-page/who/Who";
import Brands from "@/components/user/collaborate-page/brands/Brands";
import Collaborate from "@/components/user/collaborate-page/collaborate/Collaborate";

const CollaboratePage = () => {
  return (
    <>
      <Header />
      <Story />
      <Why />
      <Who />
      <Brands />
      <Collaborate />
    </>
  );
};

export default CollaboratePage;
