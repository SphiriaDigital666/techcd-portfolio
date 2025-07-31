import React from "react";
import Image from "next/image";
import BrandCarousel from "../home-page/about/BrandCarousel";

const mockProducts = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  name: i % 2 === 0 ? "Black T-Shirt" : "White T-Shirt",
  image: "/images/home-page/store/t-shirt.png",
  price: 23,
  isNew: i < 3,
  color: i % 2 === 0 ? "Black" : "White",
  category: i % 3 === 0 ? "Men's" : i % 3 === 1 ? "Women's" : "Kids",
  subCategory: "T-Shirts",
}));

const RecommendedProducts = () => {
  return (
    <section className="relative mt-[2em] mb-[3em]">
      <div className="from-primary absolute right-0 bottom-0 aspect-square w-2/5 translate-x-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>

      <div className="px-container container mx-auto mb-[3em]">
        <p className="text-[15px] font-medium uppercase sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]">
          YOU MIGHT ALSO LIKE
        </p>

        <div className="mt-[1em] grid grid-cols-2 gap-[1.5em] lg:grid-cols-4">
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className="bg-foreground/10 border-foreground/30 relative flex h-[200px] flex-col justify-end gap-[0.5em] overflow-hidden rounded-[1em] border p-[1em] font-medium sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[375px] 2xl:h-[400px]"
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
                <div className="mt-[0.5em] flex items-center justify-between text-white">
                  <p>${product.price}</p>

                  <button
                    className="bg-foreground text-background focus:bg-background focus:text-foreground hover:bg-background hover:text-foreground relative rounded-full px-[2.5em] py-[0.5em] text-[12px] transition-all duration-300 ease-in sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]"
                    tabIndex={0}
                    aria-label={`Buy ${product.name}`}
                    // onClick={() => handleBuyClick(product.id)}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BrandCarousel />
    </section>
  );
};

export default RecommendedProducts;
