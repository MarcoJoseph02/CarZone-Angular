export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  phone_no: string;
  address: string;
  token: string;
}
export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  fname: string;
  lname: string;
  email: string;
  password: string;
  phone_no: string;
  address: string;
}

export interface UserUpdate {
  fname: string;
  lname: string;
  email: string;
  phone_no: string;
  address: string;
}

export interface UserLogout {
  email: string;
  token: string;
}

export interface UserResetPassword{
    email: string;
    otp: string;
    password: string;
    password_confirmation: string;
}

export interface UserForgotPassword{
    email: string;
}