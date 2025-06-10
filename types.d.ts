// Bank information type
interface Bank {
  iban: string;
  currency: string;
}

// Basic user information
interface User {
  address: any;
  company: any;
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  username: string;
  email: string;
  accountNumber: string;
  currency: string;
  type: 'ATM' | 'POS';
  bank: Bank;
  image?: string;
  gender?: string;
}

// API response for users list
interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

// Form data for user creation/editing
interface UserFormData {
  accountNumber: string;
  name: string;
  currency: string;
  type: string;
}

// Props for the UserForm component
interface UserFormProps {
  user: User;
  onSuccess: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

// Props for the UserTableRow component
interface UserTableRowProps {
  user: User;
  locale: string;
}

// Props for the TableHeader component
interface TableHeaderProps {
  columns: {
    accountNumber: string;
    name: string;
    currency: string;
    type: string;
    actions: string;
  };
}

// Props for the TablePagination component
interface TablePaginationProps {
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
interface ApiEndpoints {
  users: {
    list: (limit: number, skip: number) => string;
    get: (id: number) => string;
    update: (id: number) => string;
    delete: (id: number) => string;
    create: () => string;
  };
}

// Props for the LanguageSwitcher component
interface LanguageSwitcherProps {
  className?: string;
}

// Props for the EditPage component
interface EditPageProps {
  params: {
    id: string;
    locale: string;
  };
}

// Props for the CreatePage component
interface CreatePageProps {
  params: {
    locale: string;
  };
}

// Props for the HomePage component
interface HomePageProps {
  params: {
    locale: string;
  };
}

// Props for the RootLayout component
interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
} 