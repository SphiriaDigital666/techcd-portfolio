"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProfileTab from './components/ProfileTab';
import CredentialTab from './components/CredentialTab';
import ShippingAddressTab from './components/ShippingAddressTab';
import { Customer } from '../../../../../../lib/api/customerApi';

function AddCustomerPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const customerId = params.id as string;

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'credential', label: 'Credential' },
    { id: 'shipping', label: 'Shipping Address' }
  ];

  // Fetch customer data
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`http://localhost:8080/customer/${customerId}`);
        if (response.ok) {
          const data = await response.json();
          setCustomer(data.data);
        } else {
          console.error('Failed to fetch customer data');
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (customerId) {
      fetchCustomer();
    }
  }, [customerId]);

  const handleCustomerUpdate = async () => {
    // Refresh customer data after update
    try {
      const response = await fetch(`http://localhost:8080/customer/${customerId}`);
      if (response.ok) {
        const data = await response.json();
        setCustomer(data.data);
      }
    } catch (error) {
      console.error('Error refreshing customer data:', error);
    }
  };

  const renderContent = () => {
    if (loading) {
      return <div className="text-white">Loading...</div>;
    }

    if (!customer) {
      return <div className="text-white">Customer not found</div>;
    }

    switch (activeTab) {
      case 'profile':
        return <ProfileTab customer={customer} customerId={customerId} onCustomerUpdate={handleCustomerUpdate} />;
      case 'credential':
        return <CredentialTab customer={customer} customerId={customerId} onCustomerUpdate={handleCustomerUpdate} />;
      case 'shipping':
        return <ShippingAddressTab customer={customer} customerId={customerId} onCustomerUpdate={handleCustomerUpdate} />;
      default:
        return <ProfileTab customer={customer} customerId={customerId} onCustomerUpdate={handleCustomerUpdate} />;
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto container">
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

export default AddCustomerPage;
