import axios, { AxiosInstance } from 'axios';

export class AbstractNetwork {
    instance: AxiosInstance;

    constructor() {
        this.instance = axios.create();
    }
}

export class AbstractSubNetwork {
    parent: AbstractNetwork;

    constructor(parent: AbstractNetwork) {
        this.parent = parent;
    }

    axios(): AxiosInstance {
        return this.parent.instance;
    }
}
