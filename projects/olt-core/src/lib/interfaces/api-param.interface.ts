import { ApiParams } from '../models/api-params.model';
import { ApiParameter } from '../models/api-parameter.model';

export interface IApiParam {
    getAll(): Array<ApiParameter>;
    toApiParams(): ApiParams;
}
