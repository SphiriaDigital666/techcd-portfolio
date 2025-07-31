import React from "react";

import Header from "@/components/user/forum-page/header/Header";
import Content from "@/components/user/forum-page/content/Content";
import Plans from "@/components/user/forum-page/plans/Plans";
import Join from "@/components/user/forum-page/join/Join";
import FAQ from "@/components/user/forum-page/faq/FAQ";

const ForumPage = () => {
  return (
    <>
      <Header />
      <Content />
      <Plans />
      <Join />
      <FAQ />
    </>
  );
};

export default ForumPage;
