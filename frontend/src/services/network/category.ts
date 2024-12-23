import {
    CreateCategoryRequest,
    CreateCategoryResponse,
    DeleteCategoryRequest,
    GetAllCategoriesResponse,
    GetOneCategoryRequest,
    GetOneCategoryResponse,
    UpdateCategoryRequest,
    UpdateCategoryResponse,
} from '../../models/categories';
import { AbstractSubNetwork } from './abstract_network';

export class CategoryNetwork extends AbstractSubNetwork {
    async getAll(): Promise<GetAllCategoriesResponse> {
        const response =
            await this.axios().get<GetAllCategoriesResponse>('/categories');
        return response.data;
    }

    async getOne(data: GetOneCategoryRequest): Promise<GetOneCategoryResponse> {
        const response = await this.axios().get<GetOneCategoryResponse>(
            `/category`,
            {
                params: data,
            }
        );
        return response.data;
    }

    async create(data: CreateCategoryRequest): Promise<CreateCategoryResponse> {
        const response = await this.axios().post<CreateCategoryResponse>(
            '/category',
            data
        );
        return response.data;
    }

    async update(data: UpdateCategoryRequest): Promise<UpdateCategoryResponse> {
        const response = await this.axios().put<UpdateCategoryResponse>(
            '/category',
            data
        );
        return response.data;
    }

    async delete(data: DeleteCategoryRequest): Promise<void> {
        await this.axios().delete<void>('/category', { params: data });
    }
}
