"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProfileTab from './components/ProfileTab';
import CredentialTab from './components/CredentialTab';
import ShippingAddressTab from './components/ShippingAddressTab';

// Define Customer type
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
    state: string;
    zipCode: string;
  };
  createdAt: string;
  updatedAt: string;
};

function ViewCustomerPage() {
  const params = useParams();
  const customerId = params.id as string;
  const [activeTab, setActiveTab] = useState('profile');
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch customer data
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/customer/${customerId}`);
        
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setCustomer(result.data);
          } else {
            setError('Failed to fetch customer data');
          }
        } else {
          setError('Customer not found');
        }
      } catch (error) {
        console.error('Error fetching customer:', error);
        setError('Network error while fetching customer');
      } finally {
        setLoading(false);
      }
    };

    if (customerId) {
      fetchCustomer();
    }
  }, [customerId]);

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'credential', label: 'Credential' },
    { id: 'shipping', label: 'Shipping Address' }
  ];

  const renderContent = () => {
    if (!customer) return null;

    switch (activeTab) {
      case 'profile':
        return (
          <ProfileTab 
            customer={customer}
          />
        );
      case 'credential':
        return (
          <CredentialTab 
            customer={customer}
          />
        );
      case 'shipping':
        return (
          <ShippingAddressTab 
            customer={customer}
          />
        );
      default:
        return (
          <ProfileTab 
            customer={customer}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-white text-lg">Loading customer...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-white text-lg">Customer not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto container">
        {/* Header with Edit Controls */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#E5E5E5]">
              Customer: {customer.firstName} {customer.lastName}
            </h1>
            <p className="text-[#94A3B8]">View customer information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Left Navigation Panel */}
          <div className="lg:col-span-2">
            <div className="bg-[#0000004D]/30 backdrop-blur-[50px]  rounded-3xl p-6 border border-[#172D6D] ">
              <h1 className="2xl:text-2xl text-[18px] font-bold text-[#E5E5E5] mb-8">Account Settings</h1>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-2 rounded-md 2xl:text-[20px] text-[16px] transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-[#028EFC] text-white shadow-lg'
                        : 'text-[#E5E5E5] '
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Content Panel */}
          <div className="lg:col-span-4">
            <div className="bg-[#0000004D]/30 backdrop-blur-[50px]  rounded-3xl p-8 border border-[#172D6D]">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCustomerPage;
