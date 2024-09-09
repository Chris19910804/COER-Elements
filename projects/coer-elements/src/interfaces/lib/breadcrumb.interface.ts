export interface IBreadcrumb {
    page: string;
    path?: string | null;
    queryParams?: any;
    click?: (() => any);
}