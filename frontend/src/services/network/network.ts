import axios, { AxiosInstance } from 'axios';
import { AbstractNetwork } from './abstract_network';
import { AuthNetwork } from './auth';
import { CategoryNetwork } from './category';
import { RecordNetwork } from './record';
import { SubcategoryNetwork } from './subcategory';

export class Network extends AbstractNetwork {
    auth = new AuthNetwork(this);
    category = new CategoryNetwork(this);
    record = new RecordNetwork(this);
    subcategory = new SubcategoryNetwork(this);

    constructor() {
        super();

        const token = localStorage.getItem('token');
        if (token != null) {
            this.newToken(token);
        } else {
            this.instance = axios.create({
                baseURL: `${window.origin}/api`,
            });
        }
    }

    setAxios(axios: AxiosInstance) {
        this.instance = axios;
    }

    newToken(token: string) {
        localStorage.setItem('token', token);
        this.setAxios(
            axios.create({
                baseURL: `${window.origin}/api`,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
        );
    }

    resetToken() {
        localStorage.removeItem('token');
        this.setAxios(axios.create());
    }
}

export const network = new Network();
