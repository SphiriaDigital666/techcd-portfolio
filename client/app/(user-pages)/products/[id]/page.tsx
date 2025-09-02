import React from "react";

import TitleArea from "@/components/user/product-description-page/TitleArea";
import ProductDetails from "@/components/user/product-description-page/ProductDetails";
import RecommendedProducts from "@/components/user/product-description-page/RecommendedProducts";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { id } = await params;

  return (
    <>
      <TitleArea />
      <ProductDetails productId={id} />
      <RecommendedProducts />
    </>
  );
};

export default ProductDetailPage;
