"use client";
import { RiEyeLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
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

// Action Buttons Component
const ActionButtons = ({ 
  productId, 
  productName, 
  onDelete 
}: { 
  productId: string; 
  productName: string;
  onDelete: (productId: string, productName: string) => void;
}) => {
  const router = useRouter();

  const handleViewClick = () => {
    router.push(`/admin/Product/All-product/view-product/${productId}`);
  };

  const handleEditClick = () => {
    router.push(`/admin/Product/All-product/edit-product/${productId}`);
  };

  const handleDeleteClick = () => {
    onDelete(productId, productName);
  };

  return (
    <div className="ml-[-25px] flex space-x-0">
      <Button
        onClick={handleViewClick}
        className="rounded p-2 bg-transparent hover:bg-transparent focus:bg-transparent"
        aria-label="View product details"
      >
        <RiEyeLine size={20} className="text-white" />
      </Button>
      <Button
        onClick={handleEditClick}
        className="rounded p-2 bg-transparent hover:bg-transparent focus:bg-transparent"
        aria-label="Edit product details"
      >
        <FiEdit size={20} className="text-white" />
      </Button>
      <Button
        onClick={handleDeleteClick}
        className="rounded p-2 bg-transparent hover:bg-transparent focus:bg-transparent"
        aria-label="Delete product"
      >
        <FiTrash2 size={20} className="text-white" />
      </Button>
    </div>
  );
};

export const createColumns = (onDelete: (productId: string, productName: string) => void): ColumnDef<Product>[] => [
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
      return (
        <ActionButtons 
          productId={row.original.id} 
          productName={row.original.productName}
          onDelete={onDelete}
        />
      );
    },
  },
];
