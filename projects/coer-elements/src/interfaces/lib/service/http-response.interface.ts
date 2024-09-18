export interface IHttpResponse<T> {
    body: T;
    status: number;
    message: string;
    ok: boolean;
}