import { Directive, OnDestroy, output, OnInit, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[lifecycle]'
})
export class LifeCycleDirective implements OnChanges, OnInit, AfterViewInit, OnDestroy {

    //Outputs
    public OnChanges = output<SimpleChanges>();
    public onInit = output<HTMLElement>();
    public afterViewInit = output<HTMLElement>();
    public onDestroy = output<HTMLElement>();

    constructor(private element: ElementRef) { }

    ngOnChanges(changes: SimpleChanges): void {
        this.OnChanges.emit(changes);
    }

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