export interface IGridHeaderButton {
    show: boolean;
    path?: string | (string | number)[];
    tooltip?: string;
    isDisabled?: boolean;
    preventDefault?: boolean;
    Autofill?: boolean;
}