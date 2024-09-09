import { inject } from "@angular/core";
import { Router } from '@angular/router';
import { IAppSource } from "../../interfaces";
import { Breadcrumbs } from "./breadcrumbs.class";
import { Tools } from './generi-tools';

export class Source {

    private static readonly storage = 'COER-System';

    /** */
    public static Set(page: string): void {
        const ROUTER = inject(Router);

        let path = ROUTER.url;
        if (path.includes('?')) path = path.split('?')[0];

        Breadcrumbs.Add(page, path);

        const breadcrumbs = Breadcrumbs.Get();

        if(breadcrumbs.length >= 2) {
            breadcrumbs.pop();
            const breadcrumb = breadcrumbs.pop()!;
            this.Save({ page: breadcrumb.page, path: breadcrumb.path });
        }

        else this.Save(null);
    }


    /** */
    private static Save(source: IAppSource | null): void {
        let storage = sessionStorage.getItem(this.storage) as any;
        if (storage) storage = JSON.parse(storage);
        storage = Object.assign({}, storage, { source });
        sessionStorage.setItem(this.storage, JSON.stringify(storage));
    }


    /** */
    public static Get(): IAppSource | null {
        let storage = sessionStorage.getItem(this.storage) as any;

        if (storage) {
            storage = JSON.parse(storage);

            if (storage.hasOwnProperty('source')) {
                return storage.source;
            }
        }

        return null;
    }


    /** */
    public static GetRoot(): IAppSource | null {
        const breadcrumbs = Breadcrumbs.Get();
        return (breadcrumbs.length > 0) ? breadcrumbs.shift()! : null;
    }


    /** */
    public static SetPageResponse<T>(pageResponse: T): void {
        let storage = sessionStorage.getItem(this.storage) as any;
        storage = JSON.parse(storage);
        storage = Object.assign({}, storage, { pageResponse });
        sessionStorage.setItem(this.storage, JSON.stringify(storage));
    }


    /** */
    public static GetPageResponse<T>(): T | null {
        let storage = sessionStorage.getItem(this.storage) as any;

        if (storage) {
            storage = JSON.parse(storage);

            if (storage.hasOwnProperty('pageResponse')) {
                return Tools.BreakReference(storage.pageResponse);
            }
        }

        return null;
    }


    /** */
    public static ClearPageResponse(): void {
        let storage = sessionStorage.getItem(this.storage) as any;
        storage = JSON.parse(storage);

        if (storage.hasOwnProperty('pageResponse')) {
            delete storage.pageResponse;
        }

        storage = Object.assign({}, storage);
        sessionStorage.setItem(this.storage, JSON.stringify(storage));
    }


    /** */
    public static Reset(): void {
        sessionStorage.removeItem(this.storage);
    }
}