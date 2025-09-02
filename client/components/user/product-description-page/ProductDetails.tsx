"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { MdProductionQuantityLimits } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/user/ui/Select";

import { Product } from "@/lib/types";
import api from "@/lib/axios-instance";
import ProductCarousel from "./ProductCarousel";
import PrimaryButton from "../ui/PrimaryButton";

const ProductDetails = ({ productId }: { productId: string }) => {
  const [loading, setLoading] = useState(true);
  const [fetchedProduct, setFetchedProduct] = useState<Product>();
  const [error, setError] = useState(false);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/product/${productId}`);
        const data = res.data.data;

        console.log(data);
        setFetchedProduct(data);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  return (
    <section className="mt-[2em]">
      <div className="px-container relative container mx-auto">
        {error && (
          <div className="bg-foreground/10 border-foreground/30 flex h-[200px] flex-col items-center justify-center gap-[0.3em] rounded-[1em] border p-[1em] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px]">
            <MdProductionQuantityLimits className="text-[3em]" />
            <p>Product Not Found</p>
            <p className="mt-[0.5em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
              The product you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/products"
              className="border-foreground hover:bg-foreground hover:text-background mt-[0.5em] rounded-full border-2 px-[1em] py-[0.4em] text-[12px] transition-all duration-300 ease-in sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]"
            >
              Back to Products
            </Link>
          </div>
        )}

        {!error && loading && (
          <div className="bg-foreground/10 border-foreground/30 flex h-[200px] animate-pulse flex-col items-center justify-center gap-[0.3em] rounded-[1em] border p-[1em] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px]">
            <p className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
              Loading product details
            </p>
          </div>
        )}

        {!error && !loading && fetchedProduct && (
          <>
            <div className="grid grid-cols-1 gap-[1.5em] lg:grid-cols-10">
              <div className="bg-foreground/10 border-foreground/30 relative h-[200px] rounded-[1em] border lg:col-span-4 lg:h-auto">
                <ProductCarousel
                  name={fetchedProduct.title}
                  images={fetchedProduct.productImages}
                />
              </div>

              <div className="flex flex-col gap-[1em] lg:col-span-6">
                {/* Title */}
                <p className="dark:from-foreground to-foreground bg-gradient-to-b from-[#999999] bg-clip-text text-[15px] font-semibold text-transparent uppercase sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px] dark:to-[#999999]">
                  {fetchedProduct.title}
                </p>

                {/* Desc */}
                <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px]">
                  {fetchedProduct.smallDescription}
                </p>

                {/* Price */}
                <p className="text-[15px] font-medium sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]">
                  Rs {fetchedProduct.discountPrice}.00{" "}
                  {fetchedProduct.discountPrice < fetchedProduct.price && (
                    <span className="text-[13px] font-normal line-through sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px]">
                      Rs {fetchedProduct.price}.00
                    </span>
                  )}
                </p>

                <div className="via-foreground h-[2px] bg-gradient-to-r from-transparent to-transparent"></div>

                {/* Attributes */}
                <div className="space-y-[0.5em]">
                  {fetchedProduct.attributes.map((a) => (
                    <Select key={a.attribute.name}>
                      <SelectTrigger className="data-[placeholder]:text-foreground m-0 h-[2em] max-w-3/5 leading-normal">
                        <SelectValue placeholder={a.attribute.name} />
                      </SelectTrigger>
                      <SelectContent>
                        {a.selectedVariations.map((v) => (
                          <SelectItem
                            key={v}
                            value={v}
                            className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]"
                          >
                            {v}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ))}
                </div>

                <div className="via-foreground h-[2px] bg-gradient-to-r from-transparent to-transparent"></div>

                {/* Quantity Filter */}
                <div className="flex items-center gap-4 text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
                  <p className="min-w-[70px]">Quantity</p>
                  <div className="flex items-center gap-1">
                    <button
                      className="border-foreground/30 bg-foreground/10 size-[2em] rounded-[0.5em] border transition-colors disabled:opacity-50"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="border-foreground/30 bg-foreground/10 flex size-[2em] items-center justify-center rounded-[0.5em] border transition-colors">
                      {quantity}
                    </span>
                    <button
                      className="border-foreground/30 bg-foreground/10 size-[2em] rounded-[0.5em] border transition-colors"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <PrimaryButton
                  text="Buy Now"
                  className="mt-[0.5em] w-fit gap-[2em] ps-[3em] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px]"
                  iconStyles="bg-foreground"
                />
              </div>
            </div>

            <div className="via-foreground mt-[3em] mb-[2em] h-[2px] bg-gradient-to-r from-transparent to-transparent"></div>

            <p className="text-[15px] font-medium sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]">
              Item Description
            </p>

            <p className="mt-[1.5em] text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
              {fetchedProduct.description}
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
