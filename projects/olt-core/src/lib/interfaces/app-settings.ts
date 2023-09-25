export interface IOltAppSettings {
    hosts: IOltAppSettingHost[];
}

export interface IOltAppSettingHost {
    host: string;
    apiEndpoint: string;
    environment: string;
    production: boolean;
}

export interface IOltAppSettingResult<T> {
    served: boolean;
    withError: boolean | null
    settings: T | null;
  }

  