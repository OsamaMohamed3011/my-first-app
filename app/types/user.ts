export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  image: string;
  gender: string;
  accountNumber: string;
  name: string;
  currency: string;
  type: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
} 