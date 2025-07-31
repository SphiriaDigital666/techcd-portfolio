import React from "react";
import Link from "next/link";

import ProductCarousel from "./ProductCarousel";
import PrimaryButton from "../ui/PrimaryButton";

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
          <div className="bg-foreground/10 border-foreground/30 relative h-[400px] rounded-[1em] border lg:col-span-4 lg:h-auto">
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
            <div className="text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
              <p>Size</p>
            </div>
            <div className="text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
              <p>Color</p>
            </div>
            <div className="via-foreground h-[2px] bg-gradient-to-r from-transparent to-transparent"></div>

            <div className="text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
              <p>Quantity</p>
            </div>

            <PrimaryButton
              text="Buy Now"
              className="mt-[0.5em] w-fit gap-[2em] ps-[3em] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px]"
              iconStyles="bg-foreground"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
