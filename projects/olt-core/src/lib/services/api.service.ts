import { HttpClient, HttpHeaders, HttpParams, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiParams } from '../models/api-params.model';
import { IApiParam } from '../interfaces/api-param.interface';
import { filter, switchMap } from 'rxjs/operators';

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export enum ApiVersionEnum {
  none = 'none',
  v1 = '1.0',
  v2 = '2.0',
  v3 = '3.0',
  v4 = '4.0'
}

export enum RequestTypeEnum {
  POST = 'POST',
  PUT = 'PUT'
}

@Injectable({
  providedIn: 'root'
})
export class OltApiService {
  constructor(protected httpClient: HttpClient) { }

  protected get apiVersion(): ApiVersionEnum {
    return ApiVersionEnum.v1;
  }

  protected buildParams(values?: ApiParams | IApiParam | null, version?: ApiVersionEnum | string | null): HttpParams {
    let params = new HttpParams();
    if (values != null) {

      if (values instanceof ApiParams) {
        params = values.toHttpParams();
      } else if ((values as IApiParam) !== undefined) {
        params = (values as IApiParam).toApiParams().toHttpParams();
      }

    }

    let ver = this.apiVersion as string;
    if (version != null && version !== undefined) {
      ver = version as string;
    }
    if (ver !== ApiVersionEnum.none) {
      params = params.append('api-version', ver);
    }
    return params;
  }

  protected sendFormData<T>(url: string, formData: FormData, requestType: RequestTypeEnum = RequestTypeEnum.POST, params?: ApiParams | IApiParam | null, version?: ApiVersionEnum | string | null, reportProgress = true): Observable<T | any | null> {
    return this.doFormData(url, formData, requestType, params, version, reportProgress)
      .pipe(
        filter(response => response instanceof HttpResponse),
        switchMap(response => {
          if (response instanceof HttpResponse) {
            return of(response.body);
          }
          return of(response);
        }));
  }

  doFormData<T>(url: string, formData: FormData, requestType: RequestTypeEnum = RequestTypeEnum.POST, params?: ApiParams | IApiParam | null, version?: ApiVersionEnum | string | null, reportProgress = true): Observable<HttpEvent<T>> {
    const request = new HttpRequest<FormData>(requestType, url, formData, {
      params: this.buildParams(params, version),
      reportProgress
    });
    return this.httpClient.request<T>(request);
  }

  doPut<T>(url: string, data: any | FormData, params?: ApiParams | IApiParam | null, version?: ApiVersionEnum | string | null): Observable<T | any | null> {
    if (data instanceof FormData) {
      return this.sendFormData<T>(url, data, RequestTypeEnum.PUT, params, version, true);
    }

    return this.httpClient.put<T>(url, JSON.stringify(data), {
      headers: httpOptions.headers,
      params: this.buildParams(params, version)
    });
  }

  doPatch<T>(url: string, data: any, params?: ApiParams | IApiParam | null, version?: ApiVersionEnum | string | null): Observable<T | any | null> {
    return this.httpClient.patch<T>(url, JSON.stringify(data), {
      headers: httpOptions.headers,
      params: this.buildParams(params, version)
    });
  }


  doPost<T>(url: string, data: any | FormData, params?: ApiParams | IApiParam | null, version?: ApiVersionEnum | string | null): Observable<T | any | null> {
    if (data instanceof FormData) {
      return this.sendFormData<T>(url, data, RequestTypeEnum.POST, params, version, true);
    }

    return this.httpClient.post<T>(url, JSON.stringify(data), {
      headers: httpOptions.headers,
      params: this.buildParams(params, version)
    });
  }

  doGet<T>(url: string, params?: ApiParams | IApiParam | null, version?: ApiVersionEnum | string | null): Observable<T> {
    return this.httpClient.get<T>(url, { params: this.buildParams(params, version) });
  }

  doDelete<T>(url: string, params?: ApiParams | IApiParam | null, version?: ApiVersionEnum | string | null): Observable<T> {
    return this.httpClient.delete<T>(url, { params: this.buildParams(params, version) });
  }

  toFileFormData(files?: File[] | FileList, filesFormName = 'files', formData?: FormData | null): FormData {
    formData = formData || new FormData();
    if (files == null) {
      return formData;
    }
    // tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < files.length; ++x) {
      formData.append(filesFormName, files[x], files[x].name);
    }
    return formData;
  }

  uploadFiles<T>(
    url: string,
    files: File[] | FileList,
    params?: ApiParams | IApiParam | null,
    formData?: FormData | null,
    requestType: RequestTypeEnum = RequestTypeEnum.POST,
    filesFormName = 'files',
    version?: ApiVersionEnum | string | null): Observable<T | any | null> {
    return this.sendFormData<T>(url, this.toFileFormData(files, filesFormName, formData), requestType, params, version, true);
  }

  uploadFile<T>(url: string, file: File, params?: ApiParams | IApiParam | null, formData?: FormData, requestType: RequestTypeEnum = RequestTypeEnum.POST, filesFormName = 'files', version?: ApiVersionEnum | string | null): Observable<T | any | null> {
    const files = new Array<File>();
    files.push(file);
    return this.uploadFiles<T>(url, files, params, formData, requestType, filesFormName, version);
  }

}
