"use client";

import React, { useState } from 'react'
import Credential from './Credential'
import Savebutton from './Savebutton'
import { createUser, CreateUserData } from '../../../../lib/api/userApi'

function Page() {
  const [formData, setFormData] = useState({
    // Credential fields
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    phoneNumber: '',
    password: '',
    role: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.username || !formData.phoneNumber || !formData.password || !formData.role) {
      setSubmitMessage({ type: 'error', message: 'Please fill in all required fields' });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Transform form data to match API structure
      const userData: CreateUserData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        username: formData.username,
        phoneNo: formData.phoneNumber, // Note: API expects phoneNo, not phoneNumber
        password: formData.password,
        role: formData.role,
      };

      const result = await createUser(userData);
      
      if (result.success) {
        setSubmitMessage({ type: 'success', message: 'User created successfully!' });
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          username: '',
          phoneNumber: '',
          password: '',
          role: '',
        });
      } else {
        setSubmitMessage({ type: 'error', message: result.message || 'Failed to create user' });
      }
    } catch (error) {
      setSubmitMessage({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'An error occurred while creating user' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen  text-white ">
      {/* Header */}
      <div className="flex items-center gap-4">
      <h1 className="text-[28px] font-bold sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] text-[#E5E5E5]">
            User
          </h1>
          <span className="text-[17px] text-[#E5E5E5] font-semibold sm:text-[18px] md:text-[19px] lg:text-[20px] xl:text-[20px] mt-2">
            Add User
          </span>
      </div>

      {/* Form Sections */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#0000004D]/30 backdrop-blur-[500px] rounded-xl p-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#334155] border-2 border-[#028EFC] flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#475569] flex items-center justify-center">
                  <span className="text-2xl text-[#94A3B8]">👤</span>
                </div>
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#028EFC] rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✏️</span>
              </button>
            </div>
            <h2 className="text-2xl font-bold text-[#E5E5E5] mt-4">
              {formData.firstName && formData.lastName 
                ? `${formData.firstName} ${formData.lastName}` 
                : 'New User'
              }
            </h2>
          </div>

          {/* Credential Section */}
          <Credential 
            formData={formData}
            onInputChange={handleInputChange}
          />

         

           {/* Submit Message */}
          {submitMessage && (
            <div className={`mt-4 p-3 rounded-md ${
              submitMessage.type === 'success' 
                ? 'bg-green-500/20 border border-green-500 text-green-400' 
                : 'bg-red-500/20 border border-red-500 text-red-400'
            }`}>
              {submitMessage.message}
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <Savebutton 
              identifier="add-user-btn" 
              buttonText="Save Changes" 
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
            />
          </div>
        </div>

       
      </div>
    </div>
  )
}

export default Page
