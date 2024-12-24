import {
    CreateSubcategoryRequest,
    CreateSubcategoryResponse,
    DeleteSubcategoryRequest,
    GetAllSubcategoriesRequest,
    GetAllSubcategoriesResponse,
    GetOneSubcategoryRequest,
    GetOneSubcategoryResponse,
    UpdateSubcategoryRequest,
    UpdateSubcategoryResponse,
} from '../../models/subcategories';
import { AbstractSubNetwork } from './abstract_network';

export class SubcategoryNetwork extends AbstractSubNetwork {
    async getAll(
        data: GetAllSubcategoriesRequest
    ): Promise<GetAllSubcategoriesResponse> {
        const response = await this.axios().get<GetAllSubcategoriesResponse>(
            `/subcategories`,
            { params: { category_id: data.categoryId } }
        );
        return response.data;
    }

    async getOne(
        data: GetOneSubcategoryRequest
    ): Promise<GetOneSubcategoryResponse> {
        const response = await this.axios().get<GetOneSubcategoryResponse>(
            `/subcategories`,
            {
                params: data,
            }
        );
        return response.data;
    }

    async create(
        data: CreateSubcategoryRequest
    ): Promise<CreateSubcategoryResponse> {
        const response = await this.axios().post<CreateSubcategoryResponse>(
            '/subcategories',
            data
        );
        return response.data;
    }

    async update(
        data: UpdateSubcategoryRequest
    ): Promise<UpdateSubcategoryResponse> {
        const response = await this.axios().put<UpdateSubcategoryResponse>(
            '/subcategory',
            data
        );
        return response.data;
    }

    async delete(data: DeleteSubcategoryRequest): Promise<void> {
        await this.axios().delete<void>('/subcategories', { params: data });
    }
}
