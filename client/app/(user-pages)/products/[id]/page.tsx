import React from "react";
import { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

const mockProducts: Product[] = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: i % 2 === 0 ? "Black T-Shirt" : "White T-Shirt",
  image: "/images/home-page/store/t-shirt.png",
  price: 23,
  isNew: i < 3,
  color: i % 2 === 0 ? "Black" : "White",
  category: i % 3 === 0 ? "Men's" : i % 3 === 1 ? "Women's" : "Kids",
  subCategory: "T-Shirts",
}));

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const productId = parseInt(params.id);
  const product = mockProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="bg-background text-foreground min-h-screen">
        <div className="container mx-auto px-4 py-8">
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
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/products"
            className="text-foreground/70 hover:text-foreground"
          >
            Products
          </Link>
          <span className="text-foreground/50 mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="bg-foreground/10 border-foreground/30 relative h-[400px] rounded-[1em] border lg:h-[500px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain object-center p-4"
            />
            {product.isNew && (
              <div className="absolute top-4 left-4 rounded-full bg-green-500 px-3 py-1 text-sm font-medium text-white">
                New
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
              <p className="text-2xl font-semibold text-green-500">
                ${product.price}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold">Product Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Category:</span>
                    <span>{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Subcategory:</span>
                    <span>{product.subCategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Color:</span>
                    <span>{product.color}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Description</h3>
                <p className="text-foreground/80 leading-relaxed">
                  This premium product offers exceptional quality and comfort.
                  Made with high-quality materials and designed for durability,
                  it&apos;s perfect for everyday use while maintaining style and
                  functionality.
                </p>
              </div>

              <div className="pt-4">
                <button className="bg-foreground text-background hover:bg-background hover:text-foreground w-full rounded-full px-6 py-3 font-medium transition-all duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
