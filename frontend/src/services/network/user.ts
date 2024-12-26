import { AbstractSubNetwork } from './abstract_network';
import { User } from './member';

export class UserNetwork extends AbstractSubNetwork {
    async get(): Promise<User> {
        const response = await this.axios().get<User>('/auth/check');
        return response.data;
    }
}
