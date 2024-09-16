import { IAppSource } from "../../interfaces/lib/app-source.interface";
import { Tools } from './tools';

export class Breadcrumbs {

    private static readonly storage = 'COER-System';

    /** */
    public static Add(page: string, path: string): void {
        const breadcrumbs = this.Get();
        const paths = breadcrumbs.map(item => item.path);

        if (!paths.includes(path)) {
            breadcrumbs.push({ page, path });
            this.Save(breadcrumbs);
        }
    }


    /** */
    public static Get(): IAppSource[] {
        let storage = sessionStorage.getItem(this.storage) as any;

        if (storage) {
            storage = JSON.parse(storage);

            if (storage.hasOwnProperty('breadcrumbs')) {
                return Tools.BreakReference(storage.breadcrumbs);
            }
        }

        return [];
    }


    /** */
    public static GetFirst(): IAppSource | null {
        const breadcrumbs = this.Get();
        return (breadcrumbs.length > 0) ? breadcrumbs.shift()! : null;
    }


    /** */
    public static Save(breadcrumbs: IAppSource[]): void {
        let storage = sessionStorage.getItem(this.storage) as any;
        if (storage) storage = JSON.parse(storage);
        storage = Object.assign({}, storage, { breadcrumbs });
        sessionStorage.setItem(this.storage, JSON.stringify(storage));
    }


    /** */
    public static Remove(path: string): void {
        let breadcrumbs = this.Get();
        const index = breadcrumbs.findIndex(x => x.path.toLowerCase().trim() === path.toLowerCase().trim());

        if (index >= 0) {
            breadcrumbs = Tools.BreakReference(breadcrumbs).splice(0, index + 1);
            this.Save(breadcrumbs);
        }
    }


    /** */
    public static SetLast(page: string, path: string): void {
        const breadcrumbs = this.Get();

        if (breadcrumbs.length > 0) {
            breadcrumbs[breadcrumbs.length - 1] = { page, path };
            this.Save(breadcrumbs);
        }
    }


    /** */
    public static RemoveLast(): void {
        const breadcrumbs = this.Get();

        if (breadcrumbs.length > 0) {
            breadcrumbs.pop();
            this.Save(breadcrumbs);
        }
    }
}