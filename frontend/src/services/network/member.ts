import { AbstractSubNetwork } from './abstract_network';

export type User = {
    id: number;
    name: string;
    email: string;
    accepted: boolean;
    isAdmin: boolean;
    householdId: number;
    limitation: number;
};

export class MemberNetwork extends AbstractSubNetwork {
    familyCode() {
        return this.axios()
            .get<number>('/members/family-code')
            .then((response) => response.data);
    }

    joinRequests() {
        return this.axios()
            .get<User[]>('/members/join-requests')
            .then((response) => response.data);
    }

    acceptRequest(userId: number) {
        return this.axios()
            .post('/members/accept-request', { userId })
            .then((response) => response.data);
    }

    familyMembers() {
        return this.axios()
            .get<User[]>('/members/family-members')
            .then((response) => response.data);
    }

    kickUser = (userId: number) => {
        return this.axios().delete(`/members/${userId}`);
    };

    changeLimit = (userId: number, limit: number) => {
        return this.axios().post(`/members/${userId}/limit`, { limit });
    };

    removeLimit = (userId: number) => {
        return this.axios().delete(`/members/${userId}/limit-remove`);
    };
}
