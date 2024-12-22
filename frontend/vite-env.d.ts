/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PORT: number;
}

export interface ImportMeta {
    readonly env: ImportMetaEnv;
}
