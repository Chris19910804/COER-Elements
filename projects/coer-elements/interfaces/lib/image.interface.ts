export interface IImage {
    id: number;
    foreignId: number;
    imageTypeId: number;
    imageType: string;
    name: string;
    extension: string;
    isMain: boolean;
    image: File;
    base64: string;
}