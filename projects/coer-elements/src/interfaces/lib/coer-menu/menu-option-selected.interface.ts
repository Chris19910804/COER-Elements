import { IMenu } from "./menu.interface";

export interface IMenuOptionSelected {
    level: number;
    label: string;
    icon: string;
    path: string;
    queryParams: string;
    tree: IMenu[];
}