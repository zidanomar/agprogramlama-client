export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  imageUri?: string;
};

export type UserAuth = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  iat: number;
  exp: number;
};

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
