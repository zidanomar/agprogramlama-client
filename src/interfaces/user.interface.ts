export interface IUserAuth {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  iat: number;
  exp: number;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  imageUri?: string;
}
