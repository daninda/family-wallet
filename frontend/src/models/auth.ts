export interface User {
  id: number;
  name: string;
  email: string;
  accepted: boolean;
  isAdmin: boolean;
  householdId: number;
  limitation: number;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  householdId: number;
}

export interface RegisterResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = RegisterResponse;
