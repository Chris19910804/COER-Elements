import { IGridCoerNumberBox } from "./grid-coer-numberbox.interface";
import { IGridCoerSelectBox } from "./grid-coer-selectbox.interface";
import { IGridCoerSwitch } from "./grid-coer-switch.interface";
import { IGridCoerTextBox } from "./grid-coer-textbox.interface";
import { IGridItem } from "./grid-item.interface";

export interface IGridColumn<T> {
    property: string;
    alias?: string;
    width?: string;
    textAlign?: 'left' | 'center' | 'right';
    colorBlue?: boolean | ((item: IGridItem<T>) => boolean);
    colorGreen?: boolean | ((item: IGridItem<T>) => boolean);
    colorYellow?: boolean | ((item: IGridItem<T>) => boolean);
    colorRed?: boolean | ((item: IGridItem<T>) => boolean);
    typeNumber?: boolean | ((item: IGridItem<T>) => boolean);
    typeDate?: boolean | ((item: IGridItem<T>) => boolean);
    template?: string | ((item: IGridItem<T>) => string);
    coerSwitch?: ((item: IGridItem<T>) => IGridCoerSwitch);
    coerTextbox?: ((item: IGridItem<T>) => IGridCoerTextBox);
    coerNumberbox?: ((item: IGridItem<T>) => IGridCoerNumberBox);
    coerSelectbox?: ((item: IGridItem<T>) => IGridCoerSelectBox);
}