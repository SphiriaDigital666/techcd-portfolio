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
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Customer>>({});

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
            setEditData(result.data);
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

  // Handle save changes
  const handleSave = async () => {
    if (!customer || !editData) return;

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/customer/${customerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setCustomer(result.data);
          setEditData(result.data);
          setIsEditing(false);
          // Show success message or trigger refresh
          window.dispatchEvent(new CustomEvent('customerUpdated'));
        } else {
          setError('Failed to update customer');
        }
      } else {
        setError('Failed to update customer');
      }
    } catch (error) {
      console.error('Error updating customer:', error);
      setError('Network error while updating customer');
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    if (customer) {
      setEditData(customer);
      setIsEditing(false);
    }
  };

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
            editData={editData}
            setEditData={setEditData}
            isEditing={isEditing}
          />
        );
      case 'credential':
        return (
          <CredentialTab 
            customer={customer}
            editData={editData}
            setEditData={setEditData}
            isEditing={isEditing}
          />
        );
      case 'shipping':
        return (
          <ShippingAddressTab 
            customer={customer}
            editData={editData}
            setEditData={setEditData}
            isEditing={isEditing}
          />
        );
      default:
        return (
          <ProfileTab 
            customer={customer}
            editData={editData}
            setEditData={setEditData}
            isEditing={isEditing}
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
            <p className="text-[#94A3B8]">View and edit customer information</p>
          </div>
          
          <div className="flex gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-[#028EFC] text-white rounded-md hover:bg-[#5FA3B6] transition-colors"
              >
                Edit Customer
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-[#334155] text-white rounded-md hover:bg-[#475569] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            )}
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
