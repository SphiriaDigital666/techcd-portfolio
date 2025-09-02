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
    // Clear error message when user starts typing
    if (submitMessage) {
      setSubmitMessage(null);
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Real-time email validation
  const validateEmail = (email: string) => {
    if (!email) return null;
    if (email.length === 1) return 'Please enter a valid email address (e.g., user@example.com)';
    if (email.length < 3) return 'Please enter a valid email address (e.g., user@example.com)';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address (e.g., user@example.com)';
    return null;
  };

  // Real-time phone validation
  const validatePhone = (phone: string) => {
    if (!phone) return null;
    if (phone.length === 1) return 'Please enter a valid phone number (e.g., +1234567890 or 1234567890)';
    if (phone.length < 3) return 'Please enter a valid phone number (e.g., +1234567890 or 1234567890)';
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) return 'Please enter a valid phone number (e.g., +1234567890 or 1234567890)';
    return null;
  };

  // Real-time name validation
  const validateName = (name: string, fieldName: string): string | null => {
    if (!name) return null;
    if (name.length === 1) return `${fieldName} must be at least 2 characters (${name.length}/2)`;
    if (name.length < 2) return `${fieldName} must be at least 2 characters (${name.length}/2)`;
    return null;
  };

  // Real-time username validation
  const validateUsername = (username: string): string | null => {
    if (!username) return null;
    if (username.length === 1) return `Username must be at least 3 characters (${username.length}/3)`;
    if (username.length === 2) return `Username must be at least 3 characters (${username.length}/3)`;
    if (username.length < 3) return `Username must be at least 3 characters (${username.length}/3)`;
    return null;
  };

  // Real-time password validation
  const validatePassword = (password: string): string | null => {
    if (!password) return null;
    const errors = [];
    if (password.length < 8) errors.push(`at least 8 characters (${password.length}/8)`);
    if (!/[A-Z]/.test(password)) errors.push('one uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('one lowercase letter');
    if (!/[0-9]/.test(password)) errors.push('one number');
    if (!/[@$!%*?&#^()_\-+=]/.test(password)) errors.push('one special character');
    
    if (errors.length > 0) {
      return `Password needs: ${errors.join(', ')}`;
    }
    return null;
  };

  // Get field-specific error message
  const getFieldError = (field: string) => {
    const value = formData[field as keyof typeof formData];
    
    switch (field) {
      case 'firstName':
        return validateName(value, 'First name');
      case 'lastName':
        return validateName(value, 'Last name');
      case 'username':
        return validateUsername(value);
      case 'email':
        return validateEmail(value);
      case 'phoneNumber':
        return validatePhone(value);
      case 'password':
        return validatePassword(value);
      case 'role':
        if (!value) return 'Please select a role';
        return null;
    }
    return null;
  };

  // Check if form has any validation errors
  const hasValidationErrors = () => {
    const fieldsToValidate = ['firstName', 'lastName', 'username', 'email', 'phoneNumber', 'password', 'role'];
    return fieldsToValidate.some(field => getFieldError(field));
  };

  const handleSubmit = async () => {
    // Check for real-time validation errors first
    if (hasValidationErrors()) {
      const fieldsToCheck = ['firstName', 'lastName', 'username', 'email', 'phoneNumber', 'password', 'role'];
      
      const firstError = fieldsToCheck
        .map(field => getFieldError(field))
        .find(error => error !== null);
        
      setSubmitMessage({
        type: 'error',
        message: firstError || 'Please correct the validation errors above'
      });
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
            getFieldError={getFieldError}
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
