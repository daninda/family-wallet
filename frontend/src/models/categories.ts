export interface Category {
    id: number;
    name: string;
}

export type GetAllCategoriesResponse = Category[];

export interface GetOneCategoryRequest {
    id: number;
}

export type GetOneCategoryResponse = Category;

export interface CreateCategoryRequest {
    name: string;
}

export type CreateCategoryResponse = Category;

export type UpdateCategoryRequest = CreateCategoryRequest;

export type UpdateCategoryResponse = Category;

export type DeleteCategoryRequest = GetOneCategoryRequest;
