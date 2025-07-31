"use client";

import React, { useState } from "react";
import Image from "next/image";

import eclipse from "@/public/images/eclipse.svg";
import DesktopCart from "@/components/user/cart-page/DesktopCart";
import MobileCart from "@/components/user/cart-page/MobileCart";

type CartItem = {
  id: number;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
};

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

      <MobileCart
        cartItems={cartItems}
        removeItem={removeItem}
        subtotal={subtotal}
        updateQuantity={updateQuantity}
      />
      <DesktopCart
        cartItems={cartItems}
        removeItem={removeItem}
        subtotal={subtotal}
        updateQuantity={updateQuantity}
      />
    </section>
  );
};

export default CartPage;
