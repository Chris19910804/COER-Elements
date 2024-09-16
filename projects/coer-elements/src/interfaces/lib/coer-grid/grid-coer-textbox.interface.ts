export interface IGridCoerTextBox {
    isInput: boolean;
    isDisabled?: boolean;
    isValid?: boolean;
    isInvalid?: boolean;
    selectOnFocus?: boolean;
    placeholder?: string;
    textPosition?: 'left' | 'center' | 'right';
    minLength?: number;
    maxLength?: number;
}