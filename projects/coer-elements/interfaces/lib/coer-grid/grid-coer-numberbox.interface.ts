export interface IGridCoerNumberBox {
    isInput: boolean;
    isDisabled?: boolean;
    isValid?: boolean;
    isInvalid?: boolean;
    selectOnFocus?: boolean;
    placeholder?: string;
    textPosition?: 'left' | 'center' | 'right';
    min?: number;
    max?: number;
    decimals?: number;
}