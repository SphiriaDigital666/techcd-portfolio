"use client";

import React, { useState } from "react";
import Image from "next/image";

import eclipse from "@/public/images/eclipse.svg";

interface CartItem {
  id: number;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Black T-shirt",
      color: "Black",
      size: "XS",
      price: 1500.0,
      quantity: 1,
      image: "/images/home-page/store/t-shirt.png",
    },
    {
      id: 2,
      name: "Black T-shirt",
      color: "Black",
      size: "XS",
      price: 1500.0,
      quantity: 1,
      image: "/images/home-page/store/t-shirt.png",
    },
    {
      id: 3,
      name: "Black T-shirt",
      color: "Black",
      size: "XS",
      price: 1500.0,
      quantity: 1,
      image: "/images/home-page/store/t-shirt.png",
    },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <section className="relative py-[6em]">
      <Image src={eclipse} alt="" className="absolute inset-0 w-full" />

      <div className="px-container relative container mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Product List - Left Panel */}
          <div className="bg-foreground/10 overflow-hidden rounded-[0.6em] p-[1em] lg:col-span-2">
            {/* Header */}
            <div className="border-b-foreground/30 grid grid-cols-4 border-b-2 pb-[1em] text-center text-[17px] font-light uppercase sm:text-[18px] md:text-[19px] lg:text-[20px] xl:text-[20px]">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Subtotal</div>
            </div>

            {/* Product Items */}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="relative grid grid-cols-4 p-[1em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]"
              >
                {/* Product Details */}
                <div className="flex items-center gap-[1em]">
                  <div className="bg-foreground/10 relative size-[5em] flex-shrink-0 rounded-[0.5em]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain object-bottom"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{item.name}</h3>
                    <p className="text-foreground/60">
                      {item.color} / {item.size}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-foreground/30 mt-[1em] text-[13px] transition-colors hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-center">
                  <span className="text-white">Rs {item.price.toFixed(2)}</span>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-center">
                  <div className="border-foreground flex items-center rounded border">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 text-gray-400 transition-colors hover:text-white"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                      className="w-12 border-none bg-transparent text-center text-white focus:outline-none"
                      min="1"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 text-gray-400 transition-colors hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="flex items-center justify-center">
                  <span className="text-white">
                    Rs {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <div className="via-foreground absolute right-0 bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent to-transparent"></div>
              </div>
            ))}
          </div>

          {/* Cart Totals - Right Panel */}
          <div className="bg-foreground/10 overflow-hidden rounded-[0.6em] p-[1em] lg:col-span-1">
            <h2 className="pb-[1em] text-[17px] font-light uppercase sm:text-[18px] md:text-[19px] lg:text-[20px] xl:text-[20px]">
              Cart Totals
            </h2>

            <div className="border-b-foreground/30 flex items-center justify-between border-b-2 pb-[1em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
              <span className="text-gray-300">Subtotal</span>
              <span className="font-semibold text-white">
                Rs {subtotal.toFixed(2)}
              </span>
            </div>

            <button className="bg-foreground/20 border-foreground mt-[1em] w-full rounded-[0.6em] border px-[2em] py-[0.6em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
