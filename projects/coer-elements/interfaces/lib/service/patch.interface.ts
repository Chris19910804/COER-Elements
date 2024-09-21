export interface IPatch {
    op: 'remove' | 'add' | 'replace';
    path: string;
    value: any;
}