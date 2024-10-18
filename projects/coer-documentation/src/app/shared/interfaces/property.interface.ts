export interface IProperty {
    property: string;
    type: 'string' | 'number' | 'boolean',
    default: any;
    options?: any[];
}