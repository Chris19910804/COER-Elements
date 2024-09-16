export interface IGridHeaderExportButton {
    show: boolean;
    path?: string | (string | number)[];
    tooltip?: string;
    isDisabled?: boolean;
    fileName?: string;
    onlyColumnFiltered?: boolean;
    onlyRowFiltered?: boolean;
    preventDefault?: boolean;
}