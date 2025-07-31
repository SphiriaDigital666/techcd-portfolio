import React from "react";
import Image from "next/image";

type CartItem = {
  id: number;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
};

type MobileCartProps = {
  cartItems: CartItem[];
  removeItem: (id: number) => void;
  updateQuantity: (id: number, newQuantity: number) => void;
  subtotal: number;
};

const MobileCart: React.FC<MobileCartProps> = ({
  cartItems,
  removeItem,
  updateQuantity,
  subtotal,
}) => {
  return (
    <div className="px-container relative container mx-auto lg:hidden">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Product List - Left Panel */}
        <div className="bg-foreground/10 overflow-hidden rounded-[0.6em] p-[1em] lg:col-span-2">
          {/* Product Items */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col gap-[1em] p-[1em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]"
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
                  <h3 className="font-medium">{item.name}</h3>
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
              <div className="flex items-center justify-between">
                <span>Price</span>
                <span>Rs {item.price.toFixed(2)}</span>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between">
                <span>Quantity</span>
                <div className="border-foreground flex items-center rounded border">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 transition-opacity duration-300 hover:opacity-80 focus:opacity-80"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value) || 1)
                    }
                    className="w-12 border-none bg-transparent text-center focus:outline-none"
                    min="1"
                  />
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 transition-opacity duration-300 hover:opacity-80 focus:opacity-80"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="">
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
            <span className="text-foreground/80">Subtotal</span>
            <span className="font-semibold">Rs {subtotal.toFixed(2)}</span>
          </div>

          <button className="bg-foreground/20 border-foreground hover:bg-foreground/40 focus:bg-foreground/40 mt-[1em] w-full rounded-[0.6em] border px-[2em] py-[0.6em] text-[12px] transition-all duration-300 sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileCart;
