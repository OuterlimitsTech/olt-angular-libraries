import { Params } from '@angular/router';
import { ApiParams } from './api-params.model';
import { IApiParam } from '../interfaces/api-param.interface';
import { OltUtility } from '../utilities';
import { ApiParameter } from './api-parameter.model';


export class PagedParam implements IApiParam {

    fromQueryParams(params: Params): void {
        if (params == null || OltUtility.isObjectEmpty(params)) {
            this.page = 1;
            this.size = 10;
            return;
        }

        this.page = +params.get('page') || 1;
        this.size = +params.get('size') || 10;
    }

    getAll(): Array<ApiParameter> {
        const params = new Array<ApiParameter>();
        params.push(new ApiParameter('page', this.page));
        params.push(new ApiParameter('size', this.size));
        return params;
    }

    toApiParams(): ApiParams {
        const params = new ApiParams();
        params.append('page', this.page);
        params.append('size', this.size);
        return params;
    }

    public constructor(
        public page?: number,
        public size?: number
    ) { }

}
