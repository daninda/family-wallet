import {
  CreateCategoryRequest,
  CreateCategoryResponse,
  DeleteCategoryRequest,
  GetAllCategoriesResponse,
  GetOneCategoryRequest,
  GetOneCategoryResponse,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
} from '../models/categories';
import api from './api';

export default class Categories {
  static async getAll(): Promise<GetAllCategoriesResponse> {
    const response = await api.get<GetAllCategoriesResponse>('/categories');
    return response.data;
  }

  static async getOne(
    data: GetOneCategoryRequest
  ): Promise<GetOneCategoryResponse> {
    const response = await api.get<GetOneCategoryResponse>(`/category`, {
      params: data,
    });
    return response.data;
  }

  static async create(
    data: CreateCategoryRequest
  ): Promise<CreateCategoryResponse> {
    const response = await api.post<CreateCategoryResponse>('/category', data);
    return response.data;
  }

  static async update(
    data: UpdateCategoryRequest
  ): Promise<UpdateCategoryResponse> {
    const response = await api.put<UpdateCategoryResponse>('/category', data);
    return response.data;
  }

  static async delete(data: DeleteCategoryRequest): Promise<void> {
    await api.delete<void>('/category', { params: data });
  }
}
