const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

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

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to create user');
    }

    return result;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to create user');
  }
};

// Get all user roles
export const getUserRoles = async (): Promise<UserRole[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user-roles`);
    
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

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to update user');
    }

    return result;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to update user');
  }
};
