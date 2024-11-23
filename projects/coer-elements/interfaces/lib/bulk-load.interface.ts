export interface IBulkLoad<T> {
    rows: T[];
    rowsExisting: T[];
    rowsIssues: T[];
}