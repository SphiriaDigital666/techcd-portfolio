"use client";

import React, { useEffect, useState } from "react";

import api from "@/lib/axios-instance";
import { Product, Category } from "@/lib/types";

import Loading from "./Loading";
import ProductFilterSidebar from "./ProductFilterSidebar";
import ProductGridArea from "./ProductGridArea";
import BrandCarousel from "../home-page/about/BrandCarousel";

const ProductArea = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await api.get("/product");
        const categoryRes = await api.get("/product-category");
        const productData = productRes.data.data;
        const categoryData = categoryRes.data;

        console.log(productData);

        setFetchedProducts(productData);
        setFetchedCategories(categoryData);
      } catch (err) {
        console.log(err);

        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (cat: Category) => {
    console.log(selectedCategories);
    setCurrentPage(1);
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((f) => f !== cat) : [...prev, cat],
    );
    console.log(cat);
  };

  const filteredProducts =
    selectedCategories.length === 0
      ? fetchedProducts
      : fetchedProducts.filter((p) =>
          p.categories.some((cat) =>
            selectedCategories.some((sel) => sel.name === cat.name),
          ),
        );

  return (
    <section className="relative overflow-hidden pb-[2em]">
      {filteredProducts.length > 0 && (
        <div className="from-primary absolute right-0 bottom-0 aspect-square w-2/5 translate-x-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>
      )}

      <div className="px-container relative container mx-auto py-[2em]">
        {error && <div>error</div>}
        {!error && loading && <Loading />}
        {!loading && !error && (
          <div className="relative grid grid-cols-1 gap-[1.5em] lg:grid-cols-5">
            <ProductFilterSidebar
              categories={fetchedCategories}
              selectedCategories={selectedCategories}
              handleCategoryChange={handleCategoryChange}
            />

            <ProductGridArea
              products={filteredProducts}
              total={filteredProducts.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>

      <BrandCarousel />
    </section>
  );
};

export default ProductArea;
