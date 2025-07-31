"use client";

import { useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./columns";
import { FaSearch } from "react-icons/fa";


const AllProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock product data
  const products = [
    {
      id: "1",
      productImage: "/images/sample-img.jpg",
      productName: "Polo T shirt",
      stock: "12",
      price: "$10.00",
      publish: "12 june, 2025",
    },
    {
      id: "2",
      productImage: "/images/sample-img.jpg",
      productName: "Polo T shirt",
      stock: "20",
      price: "$10.00",
      publish: "12 june, 2025",
    },
    {
      id: "3",
      productImage: "/images/sample-img.jpg",
      productName: "Polo T shirt",
      stock: "Out of stock",
      price: "$10.00",
      publish: "12 june, 2025",
    },
    {
      id: "4",
      productImage: "/images/sample-img.jpg",
      productName: "Polo T shirt",
      stock: "20",
      price: "$10.00",
      publish: "12 june, 2025",
    },
    {
      id: "5",
      productImage: "/images/sample-img.jpg",
      productName: "Polo T shirt",
      stock: "20",
      price: "$10.00",
      publish: "12 june, 2025",
    },
    {
      id: "6",
      productImage: "/images/sample-img.jpg",
      productName: "Polo T shirt",
      stock: "20",
      price: "$10.00",
      publish: "12 june, 2025",
    },
    {
      id: "7",
      productImage: "/images/sample-img.jpg",
      productName: "Polo T shirt",
      stock: "20",
      price: "$10.00",
      publish: "12 june, 2025",
    },
    {
      id: "8",
      productImage: "/images/sample-img.jpg",
      productName: "Polo T shirt",
      stock: "20",
      price: "$10.00",
      publish: "12 june, 2025",
    },
  ];

  // Enhanced filtering logic
  const filteredProducts = products.filter((product) => {
    // Product name search
    const nameMatches =
      searchTerm === "" ||
      (product.productName &&
        product.productName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));

    return nameMatches;
  });
  return (
    <div>
      <div className="container mx-auto">
        {/* Student Table with Sorting & Search */}
        <div className="mt-6 rounded-2xl   sm:gap-0">
          <div className="grid flex-wrap gap-4 sm:mb-6 sm:items-center sm:justify-between sm:gap-2 md:flex">
            <div>
              <div className="flex items-center gap-4">
                                 <h1 className="text-[28px] font-bold sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] text-[#E5E5E5]">
                   Products
                 </h1>
                 <span className="text-[17px] text-[#E5E5E5] font-semibold sm:text-[18px] md:text-[19px] lg:text-[20px] xl:text-[20px] mt-2">
                   All products
                 </span>
              </div>
            </div>

            <div className=" grid flex-wrap gap-4 sm:flex sm:gap-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search For..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-[220px] rounded-3xl bg-[#0B1739]  px-3 pl-10 py-3 md:w-[250px] lg:w-[280px] xl:w-[285px] 2xl:w-[285px] border-[#FFFFFF33]/20 text-[14px]"
                />
                                 <FaSearch className="absolute top-1/2 left-3 xl:-translate-y-1 -translate-y-1/2 transform text-[#AEB9E1] text-[14px]" />
              </div>

              {/* Status Filter */}
              {/* <div className="relative mt-[7px] mr-[50px] rounded-2xl bg-[#F9FBFF]">
                <label className="text-[12px]">Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="items-center bg-[#F9FBFF] px-3 py-1 text-[12px]"
                >
                  <option value="all">All</option>
                  <option
                    value="Pending"
                    className="font-poppins text-[#0F5FC2]"
                  >
                    Pending
                  </option>
                  <option
                    value="Accepted"
                    className="font-poppins text-[#00AC4F]"
                  >
                    Accepted
                  </option>
                  <option
                    value="Declined"
                    className="font-poppins text-[#D0004B]"
                  >
                    Declined
                  </option>
                </select>
              </div> */}

              {/* Class Filter */}
              {/* <div className="relative mt-[7px] mr-[50px] rounded-2xl bg-[#F9FBFF]">
                <label className="text-[12px]">Class:</label>
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="font-poppins items-center bg-[#F9FBFF] px-2 py-1 text-[12px]"
                >
                  <option value="all" className="font-poppins">
                    All Classes
                  </option>
                  <option value="18_24_MONTHS">Month(18-24)</option>
                  <option value="TODDLER">Toddler(2-3)</option>
                  <option value="PRE_K1">Pre K1(3-4)</option>
                  <option value="SECOND_YEAR">2nd Year(4-5)</option>
                  <option value="THIRD_YEAR">Kindergarten(5-6)</option>
                </select>
              </div> */}
            </div>
          </div>

          <div className="mt-[10px] sm:mt-0">
            <DataTable columns={columns} data={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductsTable;
