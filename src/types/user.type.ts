import { User } from '@prisma/client';
export interface UserAuth extends User {
  iat: number;
  exp: number;
}

export type UserLogin = {
  email: string;
  password: string;
};

export type UserRegister = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  imageUri?: string;
};
