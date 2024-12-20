import axios from 'axios';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
} from '../models/auth';
import env from '../environment';

const api = axios.create({
  baseURL: env.VITE_API_URL,
});

export default class Auth {
  static async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>('/auth/register', data);
    return response.data;
  }

  static async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response.data;
  }

  static async check(data: { token: string }): Promise<User> {
    const response = await api.get<User>('/auth/check', {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });
    return response.data;
  }
}
