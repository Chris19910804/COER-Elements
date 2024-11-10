export interface IMenu {
    id?: number;
    label: string;
    icon?: string;
    path?: string;
    secuence?: number; 
    items?: IMenu[];
}