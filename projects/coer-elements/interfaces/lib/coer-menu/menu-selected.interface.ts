import { IMenu } from "./menu.interface";

export interface IMenuSelected {
    level: number;
    label: string;
    icon: string;
    isExpanded: boolean;
    isCollapsed: boolean;
    items?: IMenu[];
    tree: IMenu[];
}