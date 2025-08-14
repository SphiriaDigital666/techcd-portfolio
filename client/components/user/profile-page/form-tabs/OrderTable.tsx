import React from "react";
import { MdRemoveRedEye } from "react-icons/md";

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
          <button>
            <MdRemoveRedEye />
          </button>
        </div>
      ))}
    </div>
  );
};

export default OrderTable;
