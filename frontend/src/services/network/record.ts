import {
    CreateRecordRequest,
    CreateRecordResponse,
    DeleteRecordRequest,
    GetAllRecordsRequest,
    GetAllRecordsResponse,
    UpdateRecordRequest,
    UpdateRecordResponse,
} from '../../models/records';
import { AbstractSubNetwork } from './abstract_network';

export class RecordNetwork extends AbstractSubNetwork {
    async getAll(data: GetAllRecordsRequest): Promise<GetAllRecordsResponse> {
        const response = await this.axios().get<GetAllRecordsResponse>(
            '/records',
            { params: data }
        );
        return response.data;
    }

    async create(data: CreateRecordRequest): Promise<CreateRecordResponse> {
        const response = await this.axios().post<CreateRecordResponse>(
            '/records',
            data
        );
        return response.data;
    }

    async update(data: UpdateRecordRequest): Promise<UpdateRecordResponse> {
        const response = await this.axios().put<UpdateRecordResponse>(
            '/records',
            data
        );
        return response.data;
    }

    async delete(data: DeleteRecordRequest): Promise<void> {
        await this.axios().delete<void>('/records', { params: data });
    }
}
