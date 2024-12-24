export interface Record {
    id: number;
    userId: string;
    categoryId: number;
    category: string;
    subcategoryId: number;
    subcategory: string;
    price: number;
    date: string;
    description: string;
}

export interface GetAllRecordsRequest {
    categoryId?: number;
    subcategoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    from?: number;
    to?: number;
    sortBy?: string;
}

export type GetAllRecordsResponse = Record[];

export interface CreateRecordRequest {
    subсategoryId: number;
    price: number;
    date: number;
    description: string;
}

export type CreateRecordResponse = Record;

export type UpdateRecordRequest = CreateRecordRequest;

export type UpdateRecordResponse = Record;

export interface DeleteRecordRequest {
    id: number;
}
