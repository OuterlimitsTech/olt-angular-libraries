import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, map, of } from "rxjs";
import { IOltAppSettingResult } from "../interfaces/app-settings";
import { OltHelperService } from "./helper.service";


export abstract class OltAppSettingsServiceBase<T> {  
  private config = new BehaviorSubject<IOltAppSettingResult<T> | null>(null); //this.FALL_BACK_SETTINGS
  protected static _appSettings: IOltAppSettingResult<any>;

  constructor(
    protected helperService: OltHelperService,
    protected http: HttpClient
  ) { }

  get settings(): T {
    return OltAppSettingsServiceBase._appSettings?.settings;
  }    
  abstract get FALL_BACK_SETTINGS(): IOltAppSettingResult<T>;
  abstract get settingsURL(): string;  
  
  appSetting$: Observable<IOltAppSettingResult<T> | null> = this.config.asObservable();

  private _createConfig(appSettings: IOltAppSettingResult<T>, withError: boolean): void {
    const _config = { ...this.FALL_BACK_SETTINGS, ...appSettings };    
    _config.served = appSettings.served;
    _config.withError = withError;
    OltAppSettingsServiceBase._appSettings = _config;
    console.log('_createConfig', _config);
    this.config.next(appSettings);
  }

  loadAppConfig(): Observable<boolean> {
    const url = this.helperService.resolveUrl(this.settingsURL);
    return this.http.get<IOltAppSettingResult<T>>(url).pipe(
      map((response) => {
        this._createConfig(response, false);
        return true;
      }),
      catchError((error) => {
        // if in error, return set fall back from environment
        this._createConfig(this.FALL_BACK_SETTINGS, true);
        console.error(error);
        return of(false);
      })
    );
  }

  
}
