import React from "react";

import Header from "@/components/user/blog-page/header/Header";
import RecentBlogs from "@/components/user/blog-page/recent-blogs/RecentBlogs";
import AllBlogs from "@/components/user/blog-page/all-blogs/AllBlogs";

const BlogPage = () => {
  return (
    <>
      <Header />
      <RecentBlogs />
      <AllBlogs />
    </>
  );
};

export default BlogPage;
