"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Product } from "@/lib/types";

const ProductGrid = ({ products }: { products: Product[] }) => {
  const router = useRouter();

  const handleBuyClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-foreground/5 border-foreground/20 relative flex h-[200px] flex-col justify-end gap-[0.5em] overflow-hidden rounded-[1em] border p-[1em] font-medium sm:h-[250px] sm:flex-row sm:items-end sm:justify-between md:h-[300px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px]"
        >
          <div className="absolute inset-0 mx-auto w-4/5">
            <Image
              src={product.productImages[0]}
              alt={product.title}
              fill
              className="object-contain object-center"
            />
          </div>

          <div className="relative">
            <div className="text-white">{product.title}</div>
            <div className="text-white">${product.discountPrice}</div>
          </div>

          <button
            className="bg-foreground text-background hover:bg-background hover:text-foreground relative rounded-full px-[2.5em] py-[0.5em] transition-all duration-300 ease-in"
            tabIndex={0}
            aria-label={`Buy ${product.title}`}
            onClick={() => handleBuyClick(product._id)}
          >
            Buy
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
