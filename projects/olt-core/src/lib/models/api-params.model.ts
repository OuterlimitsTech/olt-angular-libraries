import { ApiParameter } from './api-parameter.model';
import { HttpParams } from '@angular/common/http';
import { IApiParam } from './../interfaces/api-param.interface';

export class ApiParams {
    private params = new Array<ApiParameter>();
    append(key: string, value: any): ApiParameter {
        const data = new ApiParameter(key, value);
        this.params.push(data);
        return data;
    }

    appendParam(param: ApiParameter): void {
        this.params.push(param);
    }

    appendParams(params: Array<ApiParameter>): void {
        params.forEach(param => {
            this.params.push(param);
        });
    }

    getAll(): Array<ApiParameter> {
        return this.params;
    }

    toHttpParams(): HttpParams {
        let params = new HttpParams();
        if (this.params) {
            this.params.forEach(val => {
                const isUndefined = (typeof val.value) === 'undefined';
                const hasValue = val.value !== null;
                const isNan = (typeof val.value) === 'number' && isNaN(val.value);
                if (!isUndefined && hasValue && !isNan) {
                    params = params.append(val.key, val.value);
                }
            });
        }
        return params;
    }

    constructor(paramOrApiParam?: string | ApiParameter | IApiParam | null | undefined, value?: any) {

        if (paramOrApiParam == null || paramOrApiParam == undefined) {
            return;
        }

        if (paramOrApiParam != null && value != null && ((typeof paramOrApiParam) === 'string')) {
            this.params.push(new ApiParameter((paramOrApiParam as string), value));
            return;
        }

        if ((paramOrApiParam as IApiParam) !== undefined) {
            const parms = paramOrApiParam as IApiParam;
            this.appendParams(parms.getAll());
            return;
        }

        if (paramOrApiParam instanceof ApiParameter) {
            this.params.push(paramOrApiParam as ApiParameter);
            return;
        }

        // if (isApiParam) {
        //     this.params.push(paramOrApiParam as ApiParameter);
        // }

        throw new Error('paramOrApiParam is invalid');
    }
}
