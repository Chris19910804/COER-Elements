import { inject } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest } from "@angular/common/http";
import { CoerAlert } from "./coer-alert/coer-alert.component";
import { IHttpRequest, IHttpResponse } from "coer-elements/interfaces";
import { Tools } from "./tools";
import { Subscription } from "rxjs";

export class Service {

    //Injections
    protected readonly alert = inject(CoerAlert);
    protected readonly http = inject(HttpClient);

    protected httpCode = {
        Ok: 200,
        Created: 201,
        NoContent: 204,
        BadRequest: 400,
        Unauthorize: 401,
        NotFound: 404,
        NotAllowed: 405,
        NotAcceptable: 406,
        Conflict: 409,
        PayloadTooLarge: 413,
        InnerError: 500
    }


    //Subscriptions
    private _GET$!: Subscription;
    private _POST$!: Subscription;
    private _PUT$!: Subscription;
    private _PATCH$!: Subscription;
    private _DELETE$!: Subscription;


    /** */
    private ReleaseSubscription(subscription: Subscription): void {
        if (subscription && !subscription.closed) subscription.unsubscribe();
    }


    /** HTTP GET */
    protected HTTP_GET<T>(request: IHttpRequest<T>) {
        return new Promise<IHttpResponse<T>>(Resolve => {
            this.ReleaseSubscription(this._GET$);

            this._GET$ = this.http.request<T>(new HttpRequest("GET", request.url, { params: request.queryParams, headers: request.headers })).subscribe({
                next: (response: HttpEvent<T> | any) => {
                    if (response.type > 0) {
                        Resolve({
                            body: Tools.BreakReference<T>(response.body),
                            status: response.status,
                            message: response.statusText,
                            ok: true
                        });
                    }
                },

                error: (httpError: HttpErrorResponse) => {
                    this.ReleaseSubscription(this._GET$);
                    this.AlertError(httpError, request.alertError);

                    Resolve({
                        body: {} as any,
                        status: httpError.status,
                        message: httpError.error?.message || httpError.error,
                        ok: false
                    });
                },

                complete: () => {
                    this.ReleaseSubscription(this._GET$);

                    if (Tools.IsNotOnlyWhiteSpace(request.alertSuccess)) {
                        this.alert.Success(request.alertSuccess);
                    }
                }
            });
        });
    }


    /** HTTP POST */
    protected HTTP_POST<T>(request: IHttpRequest<T>) {
        return new Promise<IHttpResponse<T>>(Resolve => {
            this.ReleaseSubscription(this._POST$);

            this._POST$ = this.http.request<T>(new HttpRequest("POST", request.url, request.body, { params: request.queryParams, headers: request.headers })).subscribe({
                next: (response: HttpEvent<T> | any) => {
                    if (response.type > 0) {
                        Resolve({
                            body: Tools.BreakReference<T>(response.body),
                            status: response.status,
                            message: response.statusText,
                            ok: true
                        });
                    }
                },

                error: (httpError: HttpErrorResponse) => {
                    this.ReleaseSubscription(this._POST$);
                    this.AlertError(httpError, request.alertError);

                    Resolve({
                        body: {} as any,
                        status: httpError.status,
                        message: httpError.error?.message || httpError.error,
                        ok: false
                    });
                },

                complete: () => {
                    this.ReleaseSubscription(this._POST$);

                    if (Tools.IsNotOnlyWhiteSpace(request.alertSuccess)) {
                        this.alert.Success(request.alertSuccess);
                    }
                }
            });
        });
    }


    /** HTTP PUT */
    protected HTTP_PUT<T>(request: IHttpRequest<T>) {
        return new Promise<IHttpResponse<void>>(Resolve => {
            this.ReleaseSubscription(this._PUT$);

            this._PUT$ = this.http.request<T>(new HttpRequest("PUT", request.url, request.body, { params: request.queryParams, headers: request.headers })).subscribe({
                next: (response: HttpEvent<T> | any) => {
                    if (response.type > 0) {
                        Resolve({
                            body: {} as any,
                            status: response.status,
                            message: response.statusText,
                            ok: true
                        });
                    }
                },

                error: (httpError: HttpErrorResponse) => {
                    this.ReleaseSubscription(this._PUT$);
                    this.AlertError(httpError, request.alertError);

                    Resolve({
                        body: {} as any,
                        status: httpError.status,
                        message: httpError.error?.message || httpError.error,
                        ok: false
                    });
                },

                complete: () => {
                    this.ReleaseSubscription(this._PUT$);

                    if (Tools.IsNotOnlyWhiteSpace(request.alertSuccess)) {
                        this.alert.Success(request.alertSuccess, 'Updated', 'fa-solid fa-arrows-rotate fa-spin');
                    }
                }
            });
        });
    }


    /** HTTP PATCH */
    protected HTTP_PATCH<T>(request: IHttpRequest<T>) {
        return new Promise<IHttpResponse<void>>(Resolve => {
            this.ReleaseSubscription(this._PATCH$);

            this._PATCH$ = this.http.request<T>(new HttpRequest("PATCH", request.url, request.body, { params: request.queryParams, headers: request.headers })).subscribe({
                next: (response: HttpEvent<T> | any) => {
                    if (response.type > 0) {
                        Resolve({
                            body: {} as any,
                            status: response.status,
                            message: response.statusText,
                            ok: true
                        });
                    }
                },

                error: (httpError: HttpErrorResponse) => {
                    this.ReleaseSubscription(this._PATCH$);
                    this.AlertError(httpError, request.alertError);

                    Resolve({
                        body: {} as any,
                        status: httpError.status,
                        message: httpError.error?.message || httpError.error,
                        ok: false
                    });
                },

                complete: () => {
                    this.ReleaseSubscription(this._PATCH$);

                    if (Tools.IsNotOnlyWhiteSpace(request.alertSuccess)) {
                        this.alert.Success(request.alertSuccess, 'Updated', 'fa-solid fa-arrows-rotate fa-spin');
                    }
                }
            });
        });
    }


    /** HTTP DELETE */
    protected HTTP_DELETE<T>(request: IHttpRequest<T>) {
        return new Promise<IHttpResponse<void>>(Resolve => {
            this.ReleaseSubscription(this._DELETE$);

            this._DELETE$ = this.http.request<T>(new HttpRequest("DELETE", request.url, { params: request.queryParams, headers: request.headers })).subscribe({
                next: (response: HttpEvent<T> | any) => {
                    if (response.type > 0) {
                        Resolve({
                            body: {} as any,
                            status: response.status,
                            message: response.statusText,
                            ok: true
                        });
                    }
                },

                error: (httpError: HttpErrorResponse) => {
                    this.ReleaseSubscription(this._DELETE$);
                    this.AlertError(httpError, request.alertError);

                    Resolve({
                        body: {} as any,
                        status: httpError.status,
                        message: httpError.error?.message || httpError.error,
                        ok: false
                    });
                },

                complete: () => {
                    this.ReleaseSubscription(this._DELETE$);
                    if (Tools.IsNotOnlyWhiteSpace(request.alertSuccess)) {
                        this.alert.Success(request.alertSuccess, 'Deleted', 'fa-regular fa-trash-can');
                    }
                }
            });
        });
    }


    /** */
    private AlertError(httpError: HttpErrorResponse, message?: string): void {
        if (httpError.status >= 500) {
            if (Tools.IsNotOnlyWhiteSpace(message)) {
                this.alert.Error(message, `BUG ${httpError.status}`, 'fa-solid fa-bug', null);
            }
        }

        else if (httpError.status < 500) {
            switch(httpError.status) {
                case 400: {
                    this.alert.Warning(httpError.error?.message || httpError.error, 'Bad Request', 'fa-regular fa-face-grin-beam-sweat fa-lg');
                    break;
                }

                case 401: {
                    this.alert.Warning(httpError.error?.message || httpError.error, 'Unauthorize', 'fa-regular fa-face-rolling-eyes fa-lg');
                    break;
                }

                case 404: {
                    this.alert.Warning(httpError.error?.message || httpError.error, 'Not Found', 'fa-regular fa-face-meh fa-lg');
                    break;
                }

                case 405: {
                    this.alert.Warning(httpError.error?.message || httpError.error, 'Not Allowed', 'fa-regular fa-face-grimace fa-lg');
                    break;
                }

                case 406: {
                    this.alert.Warning(httpError.error?.message || httpError.error, 'Not Acceptable', 'fa-regular fa-face-frown-open fa-lg');
                    break;
                }

                case 409: {
                    this.alert.Warning(httpError.error?.message || httpError.error, 'Conflict', 'fa-regular fa-face-dizzy fa-lg');
                    break;
                }

                case 413: {
                    this.alert.Warning(httpError.error?.message || httpError.error, 'Too Large', 'fa-regular fa-face-flushed fa-lg');
                    break;
                }

                default: {
                    if (httpError.status <= 0) {
                        this.alert.Warning('Without Connection', 'WEB API DOWN', 'fa-solid fa-plug-circle-xmark fa-lg', null);
                    }

                    else this.alert.Warning(httpError.error?.message || httpError.error);
                    break;
                }
            }
        }
    }
}