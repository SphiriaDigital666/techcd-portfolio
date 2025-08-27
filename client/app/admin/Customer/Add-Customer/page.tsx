"use client";

import React, { useState } from 'react'
import Credential from './Credential'
import Shipping from './Shipping'
import Savebutton from './Savebutton'
import { useRouter } from 'next/navigation'

function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Credential fields
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    phoneNo: '',
    password: '',
    // Shipping fields
    shippingFirstName: '',
    shippingLastName: '',
    shippingPhone: '',
    shippingEmail: '',
    state: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Test backend connection
  const testBackend = async () => {
    try {
      const response = await fetch('http://localhost:8080/customer');
      console.log('Backend test response:', response.status);
      if (response.ok) {
        console.log('Backend is accessible');
      }
    } catch (error) {
      console.error('Backend connection error:', error);
    }
  };

  // Test backend on component mount
  React.useEffect(() => {
    testBackend();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    console.log('=== handleSubmit called ===');
    console.log('Form data:', formData);
    
    // Validate required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'username', 'phoneNo', 'password',
      'shippingFirstName', 'shippingLastName', 'shippingPhone', 'shippingEmail', 'state', 'address', 'city', 'zipCode'
    ];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    console.log('Missing fields:', missingFields);
    console.log('All form data values:', Object.entries(formData).map(([key, value]) => `${key}: "${value}"`));
    
    if (missingFields.length > 0) {
      console.log('Validation failed, missing fields:', missingFields);
      setMessage({
        type: 'error',
        text: `Please fill in required fields: ${missingFields.join(', ')}`
      });
      return;
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(formData.phoneNo.replace(/\s/g, ''))) {
      setMessage({
        type: 'error',
        text: 'Please enter a valid phone number (e.g., +1234567890 or 1234567890)'
      });
      return;
    }

    if (!phoneRegex.test(formData.shippingPhone.replace(/\s/g, ''))) {
      setMessage({
        type: 'error',
        text: 'Please enter a valid shipping phone number (e.g., +1234567890 or 1234567890)'
      });
      return;
    }

    // Validate zip code format (basic validation)
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(formData.zipCode)) {
      setMessage({
        type: 'error',
        text: 'Please enter a valid zip code (e.g., 12345 or 12345-6789)'
      });
      return;
    }

    console.log('Validation passed, proceeding with API call...');
    setIsLoading(true);
    setMessage(null);

    try {
      // Transform data to match backend API structure
      const apiData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        username: formData.username,
        phoneNo: formData.phoneNo,
        password: formData.password,
        shippingInfo: {
          firstName: formData.shippingFirstName,
          lastName: formData.shippingLastName,
          phoneNo: formData.shippingPhone,
          email: formData.shippingEmail,
          state: formData.state,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode
        }
      };

      console.log('=== API Call Details ===');
      console.log('Sending data to backend:', apiData);
      console.log('API URL: http://localhost:8080/customer');
      console.log('Request method: POST');

      const response = await fetch('http://localhost:8080/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      console.log('=== Response Details ===');
      console.log('Response status:', response.status);
      console.log('Response status text:', response.statusText);
      console.log('Response headers:', response.headers);

      const result = await response.json();
      console.log('=== Response Body ===');
      console.log('Backend response:', result);
      console.log('Response type:', typeof result);
      console.log('Response keys:', Object.keys(result));

      if (response.ok) {
        console.log('=== Success ===');
        setMessage({
          type: 'success',
          text: `Customer "${formData.firstName} ${formData.lastName}" created successfully! Redirecting to customer list...`
        });
        
        // Trigger event to refresh customer table
        window.dispatchEvent(new CustomEvent('customerAdded'));
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          username: '',
          phoneNo: '',
          password: '',
          shippingFirstName: '',
          shippingLastName: '',
          shippingPhone: '',
          shippingEmail: '',
          state: '',
          address: '',
          city: '',
          zipCode: ''
        });

        // Redirect to All-Customer page after a short delay
        setTimeout(() => {
          router.push('/admin/Customer/All-Customer');
        }, 1500); // 1.5 second delay to show success message
      } else {
        console.log('=== Error Response ===');
        console.log('Validation errors:', result);
        console.log('Response not OK, status:', response.status);
        let errorMessage = 'Failed to create customer';
        
        if (result.errors && Array.isArray(result.errors)) {
          errorMessage = result.errors.map((err: any) => err.message).join(', ');
          console.log('Validation errors array:', result.errors);
        } else if (result.message) {
          errorMessage = result.message;
          console.log('Error message:', result.message);
        }
        
        console.log('Final error message:', errorMessage);
        setMessage({
          type: 'error',
          text: errorMessage
        });
      }
    } catch (error) {
      console.log('=== Network Error ===');
      console.error('Network error:', error);
      console.log('Error type:', typeof error);
      console.log('Error message:', error instanceof Error ? error.message : 'Unknown error');
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Network error. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen  text-white ">
      {/* Header */}
      <div className="flex items-center gap-4">
      <h1 className="text-[28px] font-bold sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] text-[#E5E5E5]">
            Customer
          </h1>
          <span className="text-[17px] text-[#E5E5E5] font-semibold sm:text-[18px] md:text-[19px] lg:text-[20px] xl:text-[20px] mt-2">
            Add Customer
          </span>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`mb-4 p-4 rounded-md ${
          message.type === 'success' 
            ? 'bg-green-500/20 border border-green-500 text-green-300' 
            : 'bg-red-500/20 border border-red-500 text-red-300'
        }`}>
          {message.text}
        </div>
      )}

      {/* Form Sections */}
      <div className="max-w-6xl  py-4">
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
                : 'New Customer'
              }
            </h2>
          </div>

          {/* Credential Section */}
          <Credential 
            formData={{
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              username: formData.username,
              phoneNo: formData.phoneNo,
              password: formData.password
            }}
            onInputChange={handleInputChange}
          />

          {/* Shipping Address Section */}
          <Shipping 
            formData={{
              shippingFirstName: formData.shippingFirstName,
              shippingLastName: formData.shippingLastName,
              shippingPhone: formData.shippingPhone,
              shippingEmail: formData.shippingEmail,
              state: formData.state,
              address: formData.address,
              city: formData.city,
              zipCode: formData.zipCode
            }}
            onInputChange={handleInputChange}
          />

           {/* Save Button */}
         <div className="flex justify-end mt-6 gap-4">
           
         <Savebutton 
           identifier="add-product-btn" 
           buttonText="Save Changes" 
           onSubmit={handleSubmit}
           isLoading={isLoading}
         />
         
         </div>
        </div>

       
      </div>
    </div>
  )
}

export default Page
