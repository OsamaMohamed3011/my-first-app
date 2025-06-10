// Base URL for the DummyJSON API
export const BASE_URL = 'https://dummyjson.com';

// Number of users to show per page
export const USERS_PER_PAGE = 10;

// API feature flags and settings
export const API_CONFIG = {
  // Add any API-specific configuration here
  enableCache: true,
  timeout: 5000, // milliseconds
  retryAttempts: 3
};

// API endpoint types
export interface ApiEndpoint {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

export interface ApiEndpoints {
  users: {
    list: (limit: number, skip: number) => ApiEndpoint;
    get: (id: number) => ApiEndpoint;
    update: (id: number) => ApiEndpoint;
    create: () => ApiEndpoint;
    delete: (id: number) => ApiEndpoint;
  };
}

// API endpoints configuration
export const API_ENDPOINTS: ApiEndpoints = {
  users: {
    // Get a list of users with pagination
    list: (limit: number, skip: number) => ({
      url: `${BASE_URL}/users?limit=${limit}&skip=${skip}&select=firstName,lastName,bank,id,image,gender`,
      method: 'GET'
    }),

    // Get a single user by ID
    get: (id: number) => ({
      url: `${BASE_URL}/users/${id}`,
      method: 'GET'
    }),

    // Update a user's information
    update: (id: number) => ({
      url: `${BASE_URL}/users/${id}`,
      method: 'PUT'
    }),

    // Create a new user
    create: () => ({
      url: `${BASE_URL}/users/add`,
      method: 'POST'
    }),

    // Delete a user
    delete: (id: number) => ({
      url: `${BASE_URL}/users/${id}`,
      method: 'DELETE'
    })
  }
};
