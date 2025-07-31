import React from "react";
import Link from "next/link";

import ProductCarousel from "./ProductCarousel";

const mockProducts = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: i % 2 === 0 ? "Black T-Shirt" : "White T-Shirt",
  images: [
    "/images/home-page/store/t-shirt.png",
    "/images/home-page/store/t-shirt.png",
    "/images/home-page/store/t-shirt.png",
    "/images/home-page/store/t-shirt.png",
  ],
  price: 23,
  isNew: i < 3,
  color: i % 2 === 0 ? "Black" : "White",
  category: i % 3 === 0 ? "Men's" : i % 3 === 1 ? "Women's" : "Kids",
  subCategory: "T-Shirts",
}));

const ProductDetails = ({ productId }: { productId: number }) => {
  const product = mockProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <section className="mt-[2em]">
        <div className="px-container container mx-auto">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
            <p className="mb-6">
              The product you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/products"
              className="bg-foreground text-background hover:bg-background hover:text-foreground rounded-full px-6 py-2 transition-all duration-300"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-[2em]">
      <div className="px-container container mx-auto">
        <div className="grid grid-cols-1 gap-[1.5em] lg:grid-cols-10">
          <div className="bg-foreground/10 border-foreground/30 relative h-[400px] rounded-[1em] border lg:col-span-4 lg:h-[500px]">
            <ProductCarousel name={product.name} images={product.images} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
