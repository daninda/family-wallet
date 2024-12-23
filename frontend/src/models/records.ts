export interface Record {
    id: number;
    userId: string;
    subCategoryId: number;
    price: number;
    date: string;
    description: string;
}

export interface GetAllRecordsRequest {
    categoryId?: number;
    subCategoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    from?: number;
    to?: number;
}

export type GetAllRecordsResponse = Record[];

export interface CreateRecordRequest {
    subCategoryId: number;
    price: number;
    date: string;
    description: string;
}

export type CreateRecordResponse = Record;

export type UpdateRecordRequest = CreateRecordRequest;

export type UpdateRecordResponse = Record;

export interface DeleteRecordRequest {
    id: number;
}
