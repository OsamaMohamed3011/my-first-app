import { BASE_URL, USERS_PER_PAGE, API_ENDPOINTS, ApiEndpoint } from '../config/api';
import { User, ApiResponse } from '../types';

// API endpoints configuration
export const API_ENDPOINTS_CONFIG = {
  users: {
    // Get a list of users with pagination
    list: (limit: number = USERS_PER_PAGE, skip: number = 0) => 
      `${BASE_URL}/users?limit=${limit}&skip=${skip}&select=firstName,lastName,bank,id,image,gender`,
    
    // Get a single user by ID
    get: (id: number) => 
      `${BASE_URL}/users/${id}`,
    
    // Update a user's information
    update: (id: number) => 
      `${BASE_URL}/users/${id}`,
    
    // Delete a user
    delete: (id: number) => 
      `${BASE_URL}/users/${id}`,
    
    // Create a new user
    create: () => 
      `${BASE_URL}/users/add`
  }
}; 

// API client functions
export async function fetchUsers(page: number = 1): Promise<ApiResponse<User[]>> {
  try {
    const skip = (page - 1) * USERS_PER_PAGE;
    const response = await fetch(API_ENDPOINTS_CONFIG.users.list(USERS_PER_PAGE, skip));
    const data = await response.json();
    return {
      data: data.users,
      status: response.status
    };
  } catch (error) {
    return {
      data: [],
      status: 500,
      message: 'Failed to fetch users'
    };
  }
}

export async function fetchUser(id: number): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(API_ENDPOINTS_CONFIG.users.get(id));
    const data = await response.json();
    return {
      data,
      status: response.status
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Failed to fetch user'
    };
  }
} 

export { USERS_PER_PAGE, API_ENDPOINTS };

// Helper function to make API requests
export async function makeApiRequest<T>(endpoint: ApiEndpoint, options?: RequestInit): Promise<T> {
  const response = await fetch(endpoint.url, {
    method: endpoint.method,
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}
