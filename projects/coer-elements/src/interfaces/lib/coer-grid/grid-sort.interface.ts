export interface IGridSort {
    columnName: string;
    direction: 'ascendant' | 'descendant' | 'none';
    icon: 'fa-solid fa-arrow-up-wide-short' | 'fa-solid fa-arrow-down-short-wide' | '';
}