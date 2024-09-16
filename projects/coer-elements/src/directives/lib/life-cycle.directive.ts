import { Directive, OnDestroy, output, OnInit, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[lifecycle]'
})
export class LifeCycleDirective implements OnInit, AfterViewInit, OnDestroy {

    //Outputs
    public onInit = output<HTMLElement>();
    public afterViewInit = output<HTMLElement>();
    public onDestroy = output<HTMLElement>();

    constructor(private element: ElementRef) { }

    ngOnInit() {
        this.onInit.emit(this.element.nativeElement);
    }

    ngAfterViewInit(): void {
        this.afterViewInit.emit(this.element.nativeElement);
    }

    ngOnDestroy() {
        this.onDestroy.emit(this.element.nativeElement);
    }
}