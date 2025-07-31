"use client";

import React, { useState } from "react";
import Link from "next/link";

import ProductCarousel from "./ProductCarousel";
import PrimaryButton from "../ui/PrimaryButton";
import { cn } from "@/lib/utils";

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
  color: i % 2 === 0 ? "#000000" : "#FFFFFF",
  category: i % 3 === 0 ? "Men's" : i % 3 === 1 ? "Women's" : "Kids",
  subCategory: "T-Shirts",
}));

const ProductDetails = ({ productId }: { productId: number }) => {
  const product = mockProducts.find((p) => p.id === productId);

  const [selectedSize, setSelectedSize] = useState<string>("S");
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.color === "#000000" ? "#000000" : "#FFFFFF",
  );
  const [quantity, setQuantity] = useState<number>(1);
  const sizes = ["S", "M", "L", "XL"];
  const colors = ["#000000", "#FFFFFF"];

  if (!product) {
    return (
      <section className="mt-[2em]">
        <div className="px-container relative container mx-auto">
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
      <div className="px-container relative container mx-auto">
        <div className="grid grid-cols-1 gap-[1.5em] lg:grid-cols-10">
          <div className="bg-foreground/10 border-foreground/30 relative h-[200px] rounded-[1em] border lg:col-span-4 lg:h-auto">
            <ProductCarousel name={product.name} images={product.images} />
          </div>

          <div className="flex flex-col gap-[1em] lg:col-span-6">
            {/* Title */}
            <p className="dark:from-foreground to-foreground bg-gradient-to-b from-[#999999] bg-clip-text text-[15px] font-semibold text-transparent uppercase sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px] dark:to-[#999999]">
              {product.name}
            </p>

            {/* Desc */}
            <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px]">
              Aliquam hendrerit a augue insuscipit. Etiam aliquam massa quis des
              mauris commodo venenatis ligula commodo leez sed blandit convallis
              dignissim.
            </p>

            {/* Price */}
            <p className="text-[15px] font-medium sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]">
              RS 1200.00{" "}
              <span className="text-[13px] font-normal line-through sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px]">
                RS 2000.00
              </span>
            </p>

            <div className="via-foreground h-[2px] bg-gradient-to-r from-transparent to-transparent"></div>

            {/* Size Filter */}
            <div className="flex items-center gap-4 text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
              <p className="min-w-[40px]">Size</p>
              {sizes.map((size) => (
                <button
                  key={size}
                  className={cn(
                    "border-foreground/30 bg-foreground/10 size-[2em] rounded-[0.5em] border transition-colors duration-300",
                    selectedSize === size && "bg-primary border-primary",
                  )}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Color Filter */}
            <div className="flex items-center gap-4 text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
              <p className="min-w-[40px]">Color</p>
              {colors.map((color) => {
                const colorId = `color-${color}`;
                return (
                  <label
                    key={color}
                    htmlFor={colorId}
                    className={cn(
                      "outline-foreground size-[1.5em] rounded-full outline-2 outline-offset-2 transition-all duration-300",
                      selectedColor === color && "outline-primary",
                    )}
                    style={{ backgroundColor: color }}
                  >
                    <input
                      type="radio"
                      id={colorId}
                      name="color"
                      value={color}
                      checked={selectedColor === color}
                      onChange={() => setSelectedColor(color)}
                      className="hidden"
                    />
                  </label>
                );
              })}
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
          Phasellus eget fermentum mauris. Suspendisse nec dignissim nulla.
          Integer non quam commodo, scelerisque felis id, eleifend turpis.
          Phasellus in nulla quis erat tempor tristique eget vel purus. Nulla
          pharetra pharetra pharetra. Praesent varius eget justo ut lacinia.
          Phasellus pharetra, velit viverra lacinia consequat, ipsum odio mollis
          dolor, nec facilisis arcu arcu ultricies sapien. Quisque ut dapibus
          nunc. Vivamus sit amet efficitur velit. Phasellus eget fermentum
          mauris. Suspendisse nec dignissim nulla. Integer non quam commodo,
          scelerisque felis id, eleifend turpis. Phasellus in nulla quis erat
          tempor tristique eget vel purus. Nulla pharetra pharetra pharetra.
          Praesent varius eget justo ut lacinia. Phasellus pharetra, velit
          viverra lacinia consequat, ipsum odio mollis dolor, nec facilisis arcu
          arcu ultricies sapien. Quisque ut dapibus nunc. Vivamus sit amet
          efficitur velit.
          <br /> <br />
          Phasellus eget fermentum mauris. Suspendisse nec dignissim nulla.
          Integer non quam commodo, scelerisque felis id, eleifend turpis.
          Phasellus in nulla quis erat tempor tristique eget vel purus. Nulla
          pharetra pharetra pharetra. Praesent varius eget justo ut lacinia.
          Phasellus pharetra, velit viverra lacinia consequat, ipsum odio mollis
          dolor, nec facilisis arcu arcu ultricies sapien. Quisque ut dapibus
          nunc. Vivamus sit amet efficitur velit. Phasellus eget fermentum
          mauris. Suspendisse nec dignissim nulla. Integer non quam commodo,
          scelerisque felis id, eleifend turpis
        </p>
      </div>
    </section>
  );
};

export default ProductDetails;
