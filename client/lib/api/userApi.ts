const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

console.log('API Base URL:', API_BASE_URL);

export interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNo: string;
  password: string;
  role: string;
}

export interface UserRole {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNo: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

// Create a new user
export const createUser = async (userData: CreateUserData): Promise<ApiResponse<User>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json() as ApiResponse<User>;
    
    if (!response.ok) {
      throw new Error(result.message ?? 'Failed to create user');
    }

    return result;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to create user');
  }
};

// Get all user roles
export const getUserRoles = async (): Promise<UserRole[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user-role`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user roles');
    }

    const roles = await response.json();
    return roles;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch user roles');
  }
};

// Get all users
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch users');
  }
};

// Get user by ID
export const getUserById = async (id: string): Promise<User> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch user');
  }
};

// Update user
export const updateUser = async (id: string, userData: Partial<CreateUserData>): Promise<ApiResponse<User>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json() as ApiResponse<User>;
    
    if (!response.ok) {
      throw new Error(result.message ?? 'Failed to update user');
    }

    return result;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to update user');
  }
};



// Update user profile (firstName, lastName, role)
export const updateUserProfile = async (id: string, profileData: { firstName?: string; lastName?: string; role?: string }): Promise<ApiResponse<User>> => {
  try {
    console.log('API: Updating user profile for ID:', id);
    console.log('API: Profile data:', profileData);
    console.log('API: Endpoint:', `${API_BASE_URL}/user/${id}?field=profile`);
    
    // Send the data directly in the request body as the backend expects
    console.log('API: Request body:', profileData);
    console.log('API: Request body JSON:', JSON.stringify(profileData));
    
    const response = await fetch(`${API_BASE_URL}/user/${id}?field=profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    console.log('API: Response status:', response.status);
    console.log('API: Response headers:', response.headers);

    const result = await response.json() as ApiResponse<User>;
    console.log('API: Response body:', result);
    
    if (!response.ok) {
      console.error('API: Response not OK:', response.status, result);
      throw new Error(result.message ?? 'Failed to update user profile');
    }

    return result;
  } catch (error) {
    console.error('API: Error updating user profile:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to update user profile');
  }
};

// Update user email
export const updateUserEmail = async (id: string, email: string, password: string): Promise<ApiResponse<User>> => {
  try {
    console.log('API: Updating user email for ID:', id);
    console.log('API: Email data:', { email, password: '***' });
    console.log('API: Endpoint:', `${API_BASE_URL}/user/${id}?field=email`);
    
    const response = await fetch(`${API_BASE_URL}/user/${id}?field=email`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log('API: Response status:', response.status);
    console.log('API: Response headers:', response.headers);

    const result = await response.json() as ApiResponse<User>;
    console.log('API: Response body:', result);
    
    if (!response.ok) {
      console.error('API: Response not OK:', response.status, result);
      throw new Error(result.message ?? 'Failed to update user email');
    }

    return result;
  } catch (error) {
    console.error('API: Error updating user email:', error);
    
    // Check if it's a network error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to the server. Please check if the backend is running.');
    }
    
    // Check if it's a JSON parsing error
    if (error instanceof SyntaxError) {
      throw new Error('Server response error: Invalid response from server.');
    }
    
    throw new Error(error instanceof Error ? error.message : 'Failed to update user email');
  }
};

// Update user username
export const updateUserUsername = async (id: string, username: string, password: string): Promise<ApiResponse<User>> => {
  try {
    console.log('API: Updating user username for ID:', id);
    console.log('API: Username data:', { username, password: '***' });
    console.log('API: Endpoint:', `${API_BASE_URL}/user/${id}?field=username`);
    
    const response = await fetch(`${API_BASE_URL}/user/${id}?field=username`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    console.log('API: Response status:', response.status);
    console.log('API: Response headers:', response.headers);

    const result = await response.json() as ApiResponse<User>;
    console.log('API: Response body:', result);
    
    if (!response.ok) {
      console.error('API: Response not OK:', response.status, result);
      throw new Error(result.message ?? 'Failed to update user username');
    }

    return result;
  } catch (error) {
    console.error('API: Error updating user username:', error);
    
    // Check if it's a network error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to the server. Please check if the backend is running.');
    }
    
    // Check if it's a JSON parsing error
    if (error instanceof SyntaxError) {
      throw new Error('Server response error: Invalid response from server.');
    }
    
    throw new Error(error instanceof Error ? error.message : 'Failed to update user username');
  }
};

// Update user password
export const updateUserPassword = async (id: string, currentPassword: string, newPassword: string): Promise<ApiResponse<User>> => {
  try {
    console.log('API: Updating user password for ID:', id);
    console.log('API: Password data:', { currentPassword: '***', newPassword: '***' });
    console.log('API: Endpoint:', `${API_BASE_URL}/user/${id}?field=password`);
    
    const response = await fetch(`${API_BASE_URL}/user/${id}?field=password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: currentPassword, newPassword }),
    });

    console.log('API: Response status:', response.status);
    console.log('API: Response headers:', response.headers);

    const result = await response.json() as ApiResponse<User>;
    console.log('API: Response body:', result);
    
    if (!response.ok) {
      console.error('API: Response not OK:', response.status, result);
      throw new Error(result.message ?? 'Failed to update user password');
    }

    return result;
  } catch (error) {
    console.error('API: Error updating user password:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to update user password');
  }
};

// Update user phone number
export const updateUserPhone = async (id: string, phoneNo: string, password: string): Promise<ApiResponse<User>> => {
  try {
    console.log('API: Updating user phone for ID:', id);
    console.log('API: Phone data:', { phoneNo, password: '***' });
    console.log('API: Endpoint:', `${API_BASE_URL}/user/${id}?field=phoneNo`);
    
    const response = await fetch(`${API_BASE_URL}/user/${id}?field=phoneNo`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNo, password }),
    });

    console.log('API: Response status:', response.status);
    console.log('API: Response headers:', response.headers);

    const result = await response.json() as ApiResponse<User>;
    console.log('API: Response body:', result);
    
    if (!response.ok) {
      console.error('API: Response not OK:', response.status, result);
      throw new Error(result.message ?? 'Failed to update user phone number');
    }

    return result;
  } catch (error) {
    console.error('API: Error updating user phone:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to update user phone number');
  }
};

// Update specific user field
export const updateUserField = async (id: string, field: 'profile' | 'email' | 'username' | 'password' | 'phoneNo', value: any): Promise<ApiResponse<User>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${id}?field=${field}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [field]: value }),
    });

    const result = await response.json() as ApiResponse<User>;
    
    if (!response.ok) {
      throw new Error(result.message ?? `Failed to update user ${field}`);
    }

    return result;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : `Failed to update user ${field}`);
  }
};

// Test backend connectivity
export const testBackendConnection = async (): Promise<boolean> => {
  try {
    console.log('Testing backend connection to:', API_BASE_URL);
    
    const response = await fetch(`${API_BASE_URL}/user-role`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Backend connection test - Status:', response.status);
    
    if (response.ok) {
      console.log('✅ Backend is accessible and responding');
      return true;
    } else {
      console.log('⚠️ Backend responded but with error status:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ Backend connection test failed:', error);
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('Network error: Backend server is not accessible');
    }
    
    return false;
  }
};
