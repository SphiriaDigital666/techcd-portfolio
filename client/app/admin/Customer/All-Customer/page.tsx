"use client";

import { useState, useEffect } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./columns";
import { FaSearch } from "react-icons/fa";

// Define Customer type to match backend
type Customer = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  username: string;
  shippingInfo: {
    firstName: string;
    lastName: string;
    phoneNo: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
  };
  createdAt: string;
  updatedAt: string;
};

const AllCustomersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch customers from backend
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/customer');
      
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setCustomers(result.data);
        } else {
          setError('Failed to fetch customers');
        }
      } else {
        setError('Failed to fetch customers');
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setError('Network error while fetching customers');
    } finally {
      setLoading(false);
    }
  };

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Listen for storage events to refresh when new customer is added
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'customerAdded') {
        fetchCustomers();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events
    const handleCustomerAdded = () => {
      fetchCustomers();
    };

    const handleCustomerDeleted = () => {
      fetchCustomers();
      setSuccessMessage('Customer deleted successfully!');
      setTimeout(() => setSuccessMessage(null), 3000); // Auto-hide after 3 seconds
    };

    window.addEventListener('customerAdded', handleCustomerAdded);
    window.addEventListener('customerDeleted', handleCustomerDeleted);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('customerAdded', handleCustomerAdded);
      window.removeEventListener('customerDeleted', handleCustomerDeleted);
    };
  }, []);

  // Enhanced filtering logic
  const filteredCustomers = customers.filter((customer) => {
    const fullName = `${customer.firstName} ${customer.lastName}`;
    
    // Customer name search
    const nameMatches =
      searchTerm === "" ||
      fullName.toLowerCase().includes(searchTerm.toLowerCase());

    // Email search
    const emailMatches =
      searchTerm === "" ||
      (customer.email &&
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()));

    // Phone search
    const phoneMatches =
      searchTerm === "" ||
      (customer.phoneNo &&
        customer.phoneNo.toLowerCase().includes(searchTerm.toLowerCase()));

    return nameMatches || emailMatches || phoneMatches;
  });

  // Transform data for DataTable
  const transformedCustomers = filteredCustomers.map(customer => ({
    id: customer._id,
    customerImage: "/images/sample-img.jpg", // Default image
    customerName: `${customer.firstName} ${customer.lastName}`,
    phone: customer.phoneNo,
    email: customer.email,
    firstName: customer.firstName,
    lastName: customer.lastName,
    username: customer.username,
    shippingInfo: customer.shippingInfo,
    createdAt: customer.createdAt,
    updatedAt: customer.updatedAt
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-lg">Loading customers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-lg">{error}</div>
        <button 
          onClick={fetchCustomers}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto">
        {/* Customer Table with Sorting & Search */}
        <div className="mt-6 rounded-2xl   sm:gap-0">
          <div className="grid flex-wrap gap-4 sm:mb-6 sm:items-center sm:justify-between sm:gap-2 md:flex">
            <div>
              <div className="flex items-center gap-4">
                                 <h1 className="text-[28px] font-bold sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] text-[#E5E5E5]">
                   Customers
                 </h1>
                 <span className="text-[17px] text-[#E5E5E5] font-semibold sm:text-[18px] md:text-[19px] lg:text-[20px] xl:text-[20px] mt-2">
                   All customers ({customers.length})
                 </span>
              </div>
            </div>

            <div className=" grid flex-wrap gap-4 sm:flex sm:gap-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-[220px] rounded-3xl bg-[#0B1739]  px-3 pl-10 py-3 md:w-[250px] lg:w-[280px] xl:w-[285px] 2xl:w-[285px] border-[#FFFFFF33]/20 text-[14px]"
                />
                                 <FaSearch className="absolute top-1/2 left-3 xl:-translate-y-1 -translate-y-1/2 transform text-[#AEB9E1] text-[14px]" />
              </div>

              {/* Refresh Button */}
             
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-4 rounded-md bg-green-500/20 border border-green-500 text-green-300">
              {successMessage}
            </div>
          )}

          <div className="mt-[10px] sm:mt-0">
            <DataTable columns={columns} data={transformedCustomers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCustomersTable;
