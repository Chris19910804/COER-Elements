import { TemplateRef, WritableSignal } from '@angular/core';

export interface ICoerRef {
    coerRef: WritableSignal<string>;
    title: WritableSignal<string>;
    icon: WritableSignal<string>;
    isDisabled: WritableSignal<boolean>;
    show: WritableSignal<boolean>;
    tooltip: WritableSignal<string>;
    template: TemplateRef<any>;
}