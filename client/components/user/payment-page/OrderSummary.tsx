import React from "react";
import OrderItem from "./OrderItem";

const data = [
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
    quantity: 3,
    image: "/images/home-page/store/t-shirt.png",
  },
];

const OrderSummary = () => {
  const totalPrice = data.reduce(
    (prev, current) => prev + current.price * current.quantity,
    0,
  );

  return (
    <>
      <div className="flex flex-col gap-[1em]">
        {data.map((data) => (
          <OrderItem key={data.id} data={data} />
        ))}
      </div>

      <div className="mt-[1.5em] flex gap-[0.5em]">
        <input
          type="text"
          placeholder="Discount Code"
          className="border-foreground/15 focus:border-foreground/30 placeholder:text-foreground/80 h-[2.5em] grow rounded-[0.5em] border px-[1em] transition-colors focus:outline-none"
        />
        <button
          type="submit"
          className="border-foreground h-[2.5em] rounded-[0.5em] border px-[1em]"
        >
          Apply
        </button>
      </div>

      <div className="mt-[1.5em] space-y-[0.8em]">
        <div className="flex justify-between">
          <p>Subtotal: 3 items</p>
          <p>Rs {totalPrice}</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping</p>
          <p>Rs 400</p>
        </div>
        <div className="mt-[1.5em] flex justify-between">
          <p className="font-medium">Total</p>
          <p>Rs {totalPrice + 400}</p>
        </div>
      </div>

      <button
        type="submit"
        className="border-foreground mt-[1.5em] w-full rounded-[0.5em] border py-[0.5em]"
      >
        Pay Now
      </button>
    </>
  );
};

export default OrderSummary;
