import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    User,
} from '../../models/auth';
import { AbstractSubNetwork } from './abstract_network';

export class AuthNetwork extends AbstractSubNetwork {
    async register(data: RegisterRequest): Promise<RegisterResponse> {
        const response = await this.axios().post<RegisterResponse>(
            '/auth/register',
            data
        );
        return response.data;
    }

    async login(data: LoginRequest): Promise<LoginResponse> {
        const response = await this.axios().post<LoginResponse>(
            '/auth/login',
            data
        );
        return response.data;
    }

    async check(data: { token: string }): Promise<User> {
        const response = await this.axios().get<User>('/auth/check', {
            headers: {
                Authorization: `Bearer ${data.token}`,
            },
        });
        return response.data;
    }

    accepted = async () => {
        const response = await this.axios().get<boolean>('/auth/accepted');
        return response.data;
    };
}
