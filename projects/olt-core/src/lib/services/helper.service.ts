import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { Observable, BehaviorSubject } from 'rxjs';
import { IBroadcastMessage } from '../interfaces';


@Injectable({
    providedIn: 'root'
})
export class OltHelperService {
    public broadcasts: Observable<IBroadcastMessage>;
    // tslint:disable-next-line: variable-name
    private broadcasts$: BehaviorSubject<IBroadcastMessage>;


    constructor(protected toastr: ToastrService) {
        this.broadcasts$ = new BehaviorSubject<IBroadcastMessage>({}); // as BehaviorSubject<IBroadcastMessage>;
        this.broadcasts = this.broadcasts$.asObservable();
    }

    /*
    * Creates a Rool URL for the application using the baseHref attribut in the index.html
    *
    * @remarks
    * @returns url string
    *
    */
    public get baseUrl(): string {
        const url = document.getElementsByTagName('base')[0].href;
        if (url.endsWith('/')) {
            return url.substring(0, (url.length - 1));
        }
        return url;
    }

    /*
    * Using baseUrl and resolves ~/url to a full URL
    *
    * @remarks
    * @returns url string
    *
    */
    public resolveUrl(url: string): string {
        if (url.startsWith('~/')) {
            return url.replace('~/', `${this.baseUrl}/`);
        }
        return url;
    }

    /*
    * Using resolves ~/url to a full URL and concatenates the uri
    *
    * @remarks
    * @returns url string
    *
    */
    public buildUrl(baseUrl: string, uri: string): string {
        const url = this.resolveUrl(baseUrl);
        if (uri.startsWith('/') || url.endsWith('/')) {
            return `${url}${uri}`;
        }
        // return `${url}/${uri}`.replace(/\/\//g, '/');  // replace double slash with single slash (this removes double slash on the http://)
        return `${url}/${uri}`;
    }

    /*
    * Shows Success Growl Message
    *
    * @remarks
    * NOTE: You must add the scss to your project
    * ~ngx-toastr/toastr-bs4-alert
    *
    * @param message (required)
    * @param title (optional)
    * @param config (optional) - overrides default
    * @returns void
    *
    */
    growlSuccessMessage(message: string, title?: string, config?: Partial<IndividualConfig>): void {
        this.toastr.success(message, title, config);
    }

    /*
    * Shows Error Growl Message
    *
    * @remarks
    * NOTE: You must add the scss to your project
    * ~ngx-toastr/toastr-bs4-alert
    *
    * @param message (required)
    * @param title (optional)
    * @param config (optional) - overrides default
    * @returns void
    *
    */
    growlErrorMessage(message: string, title?: string, config?: Partial<IndividualConfig>): void {
        this.toastr.error(message, title, config);
    }

    /*
    * Broadcast Messenger
    *
    * @remarks
    * Send Examples:
    * broadcastService.send(new BroadcastMessage('refreshParent');
    * broadcastService.send(new BroadcastMessage('someAction', {['a', 'b', 'c']}));
    * broadcastService.send(new BroadcastMessage('doSomething', new MyClass()));
    *
    * Receive Examples:
    * broadcastService.broadcasts.subscribe(res => { console.log(res); });
    *
    * @param message (action, data)
    * @returns void
    *
    */
    broadcast(message: IBroadcastMessage): void {
        this.broadcasts$.next(Object.assign({}, message));
    }
}
