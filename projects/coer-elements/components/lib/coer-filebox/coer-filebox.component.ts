import { Component, computed, ElementRef, inject, Input, input, output, viewChild } from '@angular/core'; 
import { CoerModal } from '../../lib/coer-modal/coer-modal.component';
import { IFile, IFileImage } from 'coer-elements/interfaces';
import { CoerAlert, Files, Tools } from 'coer-elements/tools';

@Component({
    selector: 'coer-filebox',
    templateUrl: './coer-filebox.component.html',
    styleUrl: './coer-filebox.component.scss'
})
export class CoerFilebox {

    //Injections
    protected readonly alert = inject(CoerAlert);
    protected IsNull = Tools.IsNull;
    protected IsNotNull = Tools.IsNotNull;

    //Elements
    protected inputFileImage = viewChild.required<ElementRef>('inputFileImage');
    protected modal = viewChild.required<CoerModal>('modal');

    //Variables
    protected base64: string = '';
    protected _image: IFileImage | null = null;
    private readonly imageExtensions = ['png', 'jpeg', 'jpg', 'gif', 'svg'];

    //Inputs
    public type = input<'image'>('image');
    public multiple = input<boolean>(false);
    public isLoading = input<boolean>(false);
    public isDisabled = input<boolean>(false);

    @Input() set image(value: IFileImage | null | undefined) {
        this._image = Tools.IsNotNull(value) ? value as IFileImage : null;

        if(Tools.IsNotNull(value)) {
            if((value?.value as File)?.name) {
                Files.ConvertToBase64(value?.value as File).then(base64 => {
                    return this.base64 = base64;
                });
            }

            else this.base64 = (value?.value as string);
        }
    }

    //Outputs
    public onSelected = output<IFile[]>();
    public onDeleteImage = output<void>();

    //computed
    protected _isEnable = computed<boolean>(() => {
        return !this.isLoading() && !this.isDisabled();
    });


    /** */
    protected async UploadImages(event: any): Promise<void> {
        const selectedFiles: File[] = Array.from(event.target.files);

        const files: IFile[] = [];
        let extension: string | null = null;
        for (const file of selectedFiles) {

            extension = this.GetExtensionFile(file.name) || '';

            if (this.imageExtensions.includes(extension)) {
                files.push({
                    file: file,
                    extension: extension,
                    base64: await Files.ConvertToBase64(file) as string
                });
            }

            else this.alert.Warning(`<b>.${extension}</b> extension not allowed`, 'Files');
        }

        //Response
        this.inputFileImage().nativeElement.value = null;
        this.onSelected.emit([...files]);
    }


    /** */
    private GetExtensionFile = (fileName: string): string | null => {
        if (fileName.includes('.')) {
            let worlds = fileName.split('.') as string[];
            if (worlds.length > 0) {
                let extension = worlds.pop()!;
                extension = extension.trim();
                extension = extension.toLowerCase();
                if (extension.length > 0) return extension;
            }
        }

        this.alert.Warning('The file extension could not be recognized', 'Files');
        return null;
    }


    /** */
    protected DeleteImage(event: any): void {
        event.stopPropagation();

        if(this._isEnable()) {
            this.onDeleteImage.emit();
        }
    }


    /** */
    protected ExpandImage(event: any): void {
        event.stopPropagation();
        this.modal().Open();
    }
}