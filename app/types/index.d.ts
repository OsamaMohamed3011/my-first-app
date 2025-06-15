// Form types for user creation/editing
export interface UserFormProps {
  user: {
    id: number;
    accountNumber: string;
    firstName: string;
    lastName: string;
    currency: string;
    type: string;
  };
  onSuccess: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

export interface UserFormData {
  accountNumber: string;
  name: string;
  currency: string;
  type: string;
} 


// Bank information type
export interface Bank {
  cardNumber: ReactNode;
  cardExpire: ReactNode;
  iban: string;
  currency: string;
}

// Basic user information
export interface User {
  address: any;
  company: any;
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  age: number;
  accountNumber: string;
  currency: string;
  type: 'ATM' | 'POS';
  bank: Bank;
  image?: string;
  gender: string;
}

// API response for users list
export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

// Form data for user creation/editing
export interface UserFormData {
  accountNumber: string;
  name: string;
  currency: string;
  type: string;
}


// Props for the UserTableRow component
export interface UserTableRowProps {
  user: User;
  locale: string;
}

// Props for the TableHeader component
export interface TableHeaderProps {
  columns: {
    accountNumber: string;
    name: string;
    currency: string;
    type: string;
    actions: string;
  };
}

// Props for the TablePagination component
export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  translations: {
    of: string;
    page: string;
    firstPage: string;
    lastPage: string;
  };
}

// Configuration for API endpoints
export interface ApiEndpoints {
  users: {
    list: (limit: number, skip: number) => string;
    get: (id: number) => string;
    update: (id: number) => string;
    delete: (id: number) => string;
    create: () => string;
  };
}

// Props for the LanguageSwitcher component
export interface LanguageSwitcherProps {
  className?: string;
}

// Props for the EditPage component
export interface EditPageProps {
  params: {
    id: string;
    locale: string;
  };
}

// Props for the CreatePage component
export interface CreatePageProps {
  params: {
    locale: string;
  };
}

// Props for the HomePage component
export interface HomePageProps {
  params: {
    locale: string;
  };
}

// Props for the RootLayout component
export interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
} 

export interface ApiResponse<T> {
  data?: T;
  status: number;
  message?: string;
}