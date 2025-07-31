"use client";

import React, { useEffect, useState } from "react";

import { Product } from "@/lib/types";
import Pagination from "./Pagination";
import ProductGrid from "./ProductGrid";

type ProductGridAreaProps = {
  products: Product[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  total: number;
};

const ProductGridArea: React.FC<ProductGridAreaProps> = ({
  products,
  currentPage,
  setCurrentPage,
  total,
}) => {
  const [pageSize, setPageSize] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let size = 4;

      if (width < 1024) size = 6;
      else size = 9;

      setPageSize(size);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(total / pageSize);
  const paginatedProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="text-[13px] sm:text-[15px] md:text-[17px] lg:col-span-4 lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
      <div className="mb-[1em] font-medium">
        Showing {total} t-shirts matching your filters
      </div>
      <ProductGrid products={paginatedProducts} />
      {paginatedProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
      {paginatedProducts.length === 0 && (
        <div className="pt-[2em]">
          <p>No prodcuts found</p>
        </div>
      )}
    </div>
  );
};

export default ProductGridArea;
