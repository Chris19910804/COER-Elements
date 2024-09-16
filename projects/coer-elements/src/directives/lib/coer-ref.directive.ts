import { Directive, input, TemplateRef } from "@angular/core";

@Directive({
    selector: '[coerRef]'
})
export class CoerRefDirective {

    //Inputs
    public coerRef = input<string>('');
    public title = input<string>('');
    public icon = input<string>('');
    public isDisabled = input<boolean>(false);
    public show = input<boolean>(true);
    public tooltip = input<string>('');

    constructor(public template: TemplateRef<any>) {}
}