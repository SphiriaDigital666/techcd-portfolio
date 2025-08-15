import React from "react";
import Image from "next/image";

import { MdRemoveRedEye } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/user/ui/Dialog";
import eclipse from "@/public/images/eclipse.svg";

const data = [
  {
    id: "001",
    orderCode: "#546FGd1",
    orderDate: "2045/12/23",
    username: "James",
    totalPrice: "2500",
  },
  {
    id: "002",
    orderCode: "#546FGd1",
    orderDate: "2045/12/23",
    username: "James",
    totalPrice: "2500",
  },
  {
    id: "003",
    orderCode: "#546FGd1",
    orderDate: "2045/12/23",
    username: "James",
    totalPrice: "2500",
  },
  {
    id: "004",
    orderCode: "#546FGd1",
    orderDate: "2045/12/23",
    username: "James",
    totalPrice: "2500",
  },
  {
    id: "005",
    orderCode: "#546FGd1",
    orderDate: "2045/12/23",
    username: "James",
    totalPrice: "2500",
  },
  {
    id: "006",
    orderCode: "#546FGd1",
    orderDate: "2045/12/23",
    username: "James",
    totalPrice: "2500",
  },
];

const OrderTable = () => {
  return (
    <div className="text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
      <div className="relative grid grid-cols-5 pb-[1em]">
        <div className="via-foreground absolute right-0 bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent to-transparent"></div>
        <div>Order Code</div>
        <div>Date</div>
        <div>Username</div>
        <div>Total Price</div>
        <div>Action</div>
      </div>
      {data.map(({ id, orderCode, orderDate, totalPrice, username }) => (
        <div key={id} className="relative grid grid-cols-5 py-[1em] font-light">
          <div className="via-foreground absolute right-0 bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent to-transparent"></div>
          <div>{orderCode}</div>
          <div>{orderDate}</div>
          <div>{username}</div>
          <div>{totalPrice}</div>

          <Dialog>
            <DialogTrigger className="opacity-70 hover:opacity-100">
              <MdRemoveRedEye />
            </DialogTrigger>
            <DialogContent className="overflow-hidden rounded-[1em] p-[2em] pb-[3em] text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
              <Image
                src={eclipse}
                alt=""
                className="absolute inset-0 object-cover"
              />
              <div className="border-foreground/30 absolute inset-0 rounded-[1em] border"></div>

              <DialogTitle className="relative mb-[0.5em] text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]">
                Order No #23223FG
              </DialogTitle>
              <div className="relative grid grid-cols-5 gap-[1.5em] pb-[1em]">
                <div className="via-foreground absolute right-0 bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent to-transparent"></div>
                <div>Product Image</div>
                <div>Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Total</div>
              </div>

              <div className="relative grid grid-cols-5 items-center gap-[1.5em] py-[1em]">
                <div className="via-foreground absolute right-0 bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent to-transparent"></div>
                <div className="bg-foreground/10 size-[3em] rounded-full"></div>
                <div>Black Tshirt</div>
                <div>Rs 2400</div>
                <div>2</div>
                <div>Rs 4800</div>
              </div>

              <div className="relative grid grid-cols-5 items-center gap-[1.5em] py-[1em]">
                <div className="via-foreground absolute right-0 bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent to-transparent"></div>
                <div className="bg-foreground/10 size-[3em] rounded-full"></div>
                <div>White Tshirt</div>
                <div>Rs 2400</div>
                <div>2</div>
                <div>Rs 4800</div>
              </div>

              <div className="relative ms-auto mt-[1em] w-4/10 space-y-[0.5em]">
                <div className="flex items-center justify-between text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                  <p>Items Subtotal:</p>
                  <p>Rs 9600</p>
                </div>

                <div className="flex items-center justify-between text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                  <p className="text-[#0BDB45]">Coupon:</p>
                  <p>Rs 600</p>
                </div>
                <div className="via-foreground h-[1px] bg-gradient-to-r from-transparent to-transparent"></div>
                <div className="flex items-center justify-between text-[12px] font-medium sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">
                  <p>Order Total:</p>
                  <p>Rs 9000</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
};

export default OrderTable;
