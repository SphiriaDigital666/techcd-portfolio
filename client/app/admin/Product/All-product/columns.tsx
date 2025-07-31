"use client";
import { RiEyeLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Define Product type
type Product = {
  id: string;
  productImage: string;
  productName: string;
  stock: string;
  price: string;
  publish: string;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "productImage",
    header: "Product Image",
    cell: ({ row }) => {
      return (
        <img 
          src={row.original.productImage} 
          alt={row.original.productName}
          className="w-10 h-10 rounded-full object-cover"
        />
      );
    },
  },
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => {
      return row.original.productName;
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      const stock = row.original.stock;
      return (
        <span className={stock === "Out of stock" ? "text-red-500" : ""}>
          {stock}
        </span>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return row.original.price;
    },
  },
  {
    accessorKey: "publish",
    header: "Publish",
    cell: ({ row }) => {
      return row.original.publish;
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const router = useRouter();

      const handleViewClick = () => {
        // Navigate to view product page
        router.push(`/admin/Product/All-product/view-product/${row.original.id}`);
      };

      const handleEditClick = () => {
        // Navigate to edit product page
        router.push(`/admin/Product/All-product/edit-product/${row.original.id}`);
      };

      const handleDeleteClick = () => {
        // Delete action - can be implemented later
        console.log("Delete product:", row.original);
      };

      return (
        <div className="ml-[-25px] flex space-x-0">
          <Button
           
            onClick={handleViewClick}
            className="rounded p-2 bg-transparent hover:bg-transparent focus:bg-transparent"
            aria-label="View student details"
          >
            <RiEyeLine size={20} className="text-white" />
          </Button>
          <Button
           
            onClick={handleEditClick}
            className="rounded p-2 bg-transparent hover:bg-transparent focus:bg-transparent"
            aria-label="Edit student details"
          >
            <FiEdit size={20} className="text-white" />
          </Button>
          <Button
           
            onClick={handleDeleteClick}
            className="rounded p-2 bg-transparent hover:bg-transparent focus:bg-transparent"
            aria-label="Delete student"
          >
            <FiTrash2 size={20} className="text-white" />
          </Button>
        </div>
      );
    },
  },
];
