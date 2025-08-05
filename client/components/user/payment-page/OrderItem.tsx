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

const OrderItem: React.FC<{ data: CartItem }> = ({ data }) => {
  const { color, id, image, name, price, quantity, size } = { ...data };

  return (
    <div key={id} className="flex items-center gap-[1em]">
      <div className="relative">
        <div className="bg-foreground/10 relative h-[5em] w-[4.5em] rounded-[0.3em]">
          <Image
            src={image}
            alt={name}
            className="object-contain object-bottom"
            fill
          />
        </div>
        <div className="bg-foreground/50 absolute top-0 right-0 size-[1.7em] translate-x-1/2 -translate-y-1/2 rounded-full text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
          <p className="text-background absolute inset-0 m-auto size-fit">
            {quantity}
          </p>
        </div>
      </div>

      <div className="flex grow justify-between">
        <div className="">
          <p className="font-medium">Black T-shirt</p>
          <p className="text-foreground/60 mt-[0.3em] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
            {color} / {size}
          </p>
        </div>
        <p>Rs {price}</p>
      </div>
    </div>
  );
};

export default OrderItem;
