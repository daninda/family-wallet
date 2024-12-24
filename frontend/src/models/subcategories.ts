export interface Subcategory {
    id: number;
    name: string;
    categoryId: number;
}

export interface CreateSubcategoryRequest {
    name: string;
    categoryId: number;
}

export type CreateSubcategoryResponse = Subcategory;

export interface GetOneSubcategoryRequest {
    id: number;
}

export interface GetAllSubcategoriesRequest {
    categoryId: number;
}

export type GetAllSubcategoriesResponse = Subcategory[];

export type GetOneSubcategoryResponse = Subcategory;

export interface UpdateSubcategoryRequest {
    id: number;
    name: string;
    categoryId: number;
}

export type UpdateSubcategoryResponse = Subcategory;

export interface DeleteSubcategoryRequest {
    id: number;
}
