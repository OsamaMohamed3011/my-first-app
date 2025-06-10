interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  image?: string;
  accountNumber: string;
  currency: string;
  type: string;
}

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  accountNumber: string;
  currency: string;
  type: string;
} 