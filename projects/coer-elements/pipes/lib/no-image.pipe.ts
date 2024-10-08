import { Pipe, PipeTransform } from '@angular/core';
import { Files, Tools } from 'coer-elements/tools';

@Pipe({ name: 'noImage' })
export class NoImagePipe implements PipeTransform {

    transform(value: string | File | null | undefined): string {
        const NO_IMAGE = 'coer-elements/images/no-image.png';

        if(Tools.IsOnlyWhiteSpace(value) ) {
            return NO_IMAGE;
        }

        else if (typeof value === 'string') {
            return value;
        }

        //Files.ConvertToBase64(value as File).then(base64 => { return base64 });
        return NO_IMAGE;
    }
}