import React from "react";

import TitleArea from "@/components/user/product-description-page/TitleArea";
import ProductDetails from "@/components/user/product-description-page/ProductDetails";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const productId = parseInt(params.id);

  return (
    <>
      <TitleArea />
      <ProductDetails productId={productId} />
    </>
  );
};

export default ProductDetailPage;
