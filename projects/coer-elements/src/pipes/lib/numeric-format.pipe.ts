import { Pipe, PipeTransform } from '@angular/core';
import { Tools } from '../../tools/lib/tools';

@Pipe({ name: 'numericFormat' })
export class NumericFormatPipe implements PipeTransform {

    transform(value: string | number | null | undefined, decimals: number = 0): string {
        return Tools.GetNumericFormat(value, decimals);
    }
}