"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProfileTab from './components/ProfileTab';
import CredentialTab from './components/CredentialTab';
import { getUserById, User } from '@/lib/api/userApi';

function AddCustomerPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const userId = params.id as string;

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'credential', label: 'Credential' }
  ];

  const fetchUser = async () => {
    try {
      setLoading(true);
      const userData = await getUserById(userId);
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-white text-lg">Loading...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-red-400 text-lg">{error}</div>
        </div>
      );
    }

    if (!user) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-white text-lg">User not found</div>
        </div>
      );
    }

    switch (activeTab) {
      case 'profile':
        return <ProfileTab user={user} userId={userId} onUserUpdate={fetchUser} />;
      case 'credential':
        return <CredentialTab user={user} userId={userId} onUserUpdate={fetchUser} />;
      default:
        return <ProfileTab user={user} userId={userId} onUserUpdate={fetchUser} />;
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
