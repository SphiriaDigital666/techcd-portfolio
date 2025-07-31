import React from "react";
import { Product } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductGrid = ({ products }: { products: Product[] }) => {
  const router = useRouter();

  const handleBuyClick = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-foreground/10 border-foreground/30 relative flex h-[200px] flex-col justify-end gap-[0.5em] overflow-hidden rounded-[1em] border p-[1em] font-medium sm:h-[250px] sm:flex-row sm:items-end sm:justify-between md:h-[300px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px]"
        >
          <div className="absolute inset-0 mx-auto w-4/5">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain object-bottom"
            />
          </div>

          <div className="relative">
            <div className="text-white">{product.name}</div>
            <div className="text-white">${product.price}</div>
          </div>

          <button
            className="bg-foreground text-background hover:bg-background hover:text-foreground relative rounded-full px-[2.5em] py-[0.5em] transition-all duration-300 ease-in"
            tabIndex={0}
            aria-label={`Buy ${product.name}`}
            onClick={() => handleBuyClick(product.id)}
          >
            Buy
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
