import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentsModule } from 'coer-elements/components';
import { IFile } from 'coer-elements/interfaces';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, ComponentsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    //Injection
    protected mainImage: string | File | null = null;
    title = 'Documentation';

    constructor() {
    }

    /** */
    protected async UploadImages(images: IFile[], isMain: boolean): Promise<void> {
        if(images.length > 0) {
            const [image] = images;

            this.mainImage = image.file;
        }
    }


    /** */
    protected async DeleteImage(): Promise<void> {

                            this.mainImage = null;
    }
}