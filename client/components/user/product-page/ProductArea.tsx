"use client";

import React, { useEffect, useState } from "react";

import api from "@/lib/axios-instance";
import { FetchedProduct, Product } from "@/lib/types";

import Loading from "./Loading";
import ProductFilterSidebar from "./ProductFilterSidebar";
import ProductGridArea from "./ProductGridArea";
import BrandCarousel from "../home-page/about/BrandCarousel";

const ProductArea = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [fetchedData, setFetchedData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/product");
        const data: FetchedProduct[] = res.data.data;

        console.log("data", data);
        const formattedData: Product[] = data.map((item) => ({
          id: item._id,
          title: item.title,
          smallDescription: item.smallDescription,
          description: item.description,
          productImages: item.productImages,
          price: item.price,
          discountPrice: item.discountPrice,
          categories: item.categories.map((cat) => ({
            name: cat.name,
            description: cat.description,
          })),
          attributes: item.attributes.map((attr) => ({
            name: attr.attribute.name,
            variations: attr.selectedVariations,
          })),
        }));
        setFetchedData(formattedData);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="relative overflow-hidden pb-[2em]">
      {/* {filteredProducts.length > 0 && (
        <div className="from-primary absolute right-0 bottom-0 aspect-square w-2/5 translate-x-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>
      )} */}

      <div className="px-container relative container mx-auto py-[2em]">
        {error && <div>error</div>}
        {!error && loading && <Loading />}
        {!loading && !error && (
          <div className="relative grid grid-cols-1 gap-[1.5em] lg:grid-cols-5">
            {/* <ProductFilterSidebar
          categories={mockCategories}
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
        /> */}

            <ProductGridArea
              products={fetchedData}
              total={fetchedData.length}
            />
          </div>
        )}
      </div>

      <BrandCarousel />
    </section>
  );
};

export default ProductArea;
