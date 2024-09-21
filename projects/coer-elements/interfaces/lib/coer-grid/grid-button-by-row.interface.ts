import { IGridItem } from "./grid-item.interface";

export interface IGridButtonByRow<T> {
    showEditButton?: boolean | ((item: IGridItem<T>) => boolean);
    showDeleteButton?: boolean | ((item: IGridItem<T>) => boolean);
    showGoButton?: boolean | ((item: IGridItem<T>) => boolean);
}