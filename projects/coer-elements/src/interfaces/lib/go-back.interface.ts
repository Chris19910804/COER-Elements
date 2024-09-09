export interface IGoBack {
    show: boolean;
    path?: string | null;
    queryParams?: any;
    click?: (() => any);
}