import { BaseApi, ApiResult } from './baseApi';
import {TaskResponse} from '../models/interfaces.ts';
import { Task } from '../types.ts';


class Api extends BaseApi {
    public async getTasks(): Promise<ApiResult<TaskResponse[]>> {
        return this.get<TaskResponse[]>('api/init');
    }
    public async saveTasks(tasks: Task[]): Promise<ApiResult<boolean>> {
        return this.get<boolean>('api/saveTasks');
    }
}

export const api = new Api();