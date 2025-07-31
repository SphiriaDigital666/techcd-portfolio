import React from "react";
import TitleArea from "@/components/user/product-page/TitleArea";
import ProductArea from "@/components/user/product-page/ProductArea";
import BrandCarousel from "@/components/user/home-page/about/BrandCarousel";

const ProductPage = () => {
  return (
    <>
      <TitleArea />
      <ProductArea />
      <BrandCarousel />
    </>
  );
};

export default ProductPage;
