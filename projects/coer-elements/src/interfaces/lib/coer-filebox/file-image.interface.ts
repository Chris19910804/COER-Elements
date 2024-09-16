export interface IFileImage {
    value: string | File | null | undefined;
    name?: string;
    width?: string;
    maxWidth?: string;
    height?: string;
    maxHeight?: string;
    marginTop?: string;
    marginRight?: string;
    marginBottom?: string;
    marginLeft?: string;
    allowDelete?: boolean;
    allowExpand?: boolean;
}