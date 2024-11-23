import { Router } from '@angular/router';
import { AfterViewInit, Component, inject, input, OnDestroy, output } from '@angular/core';
import { GridTemplates } from './coer-grid.templates';
import { CoerAlert } from './coer-alert/coer-alert.component';
import { Tools } from './tools';

@Component({ template: '' })
export class Section<T> implements AfterViewInit, OnDestroy {
    
    //Injection
    protected readonly alert = inject(CoerAlert);
    protected readonly router = inject(Router);

    //Inputs   
    public isLoading = input<boolean>(false);
    public isUpdate = input<boolean>(false);

    //Outputs
    public onReady = output<void>();
    public onDestroy = output<void>();
    public onIsLoadingChange = output<boolean>();
    public onUpdated = output<T | null>();

    //Variables
    protected enableAnimations: boolean = false;

    ngAfterViewInit() {
        Tools.Sleep().then(_ => this.onReady.emit());
        Tools.Sleep(1000).then(_ => this.enableAnimations = true);
    }

    ngOnDestroy() {
        this.onDestroy.emit();
    }


    /** */
    protected Log(value: any, log: string | null = null): void {
        if (Tools.IsNotNull(log)) console.log({ log, value });
        else console.log(value);
    }


    //Grid Templates
    protected isActiveTemplate = GridTemplates.isActiveTemplate;
    protected coerSwitchTemplate = GridTemplates.coerSwitchTemplate;
    protected coerTextboxTemplate = GridTemplates.coerTextboxTemplate;
    protected coerIconTemplate = GridTemplates.coerIconTemplate;


    //Tools
    protected IsNull = Tools.IsNull;
    protected IsNotNull = Tools.IsNotNull;
    protected IsOnlyWhiteSpace = Tools.IsOnlyWhiteSpace;
    protected IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
}