import { Component, EventEmitter, input, Output, WritableSignal } from '@angular/core';
import { isModalOpenSIGNAL, isMenuOpenSIGNAL } from 'coer-elements/signals';
import { Tools } from 'coer-elements/tools';

@Component({
    selector: 'coer-toolbar',
    templateUrl: './coer-toolbar.component.html',
    styleUrl: './coer-toolbar.component.scss'
})
export class CoerToolbar {

    //variables
    protected isLoading: boolean = false;
    protected _isModalOpen: WritableSignal<boolean> = isModalOpenSIGNAL;

    //Inputs
    public appName = input<string>('');

    //Outputs
    @Output() onClick = new EventEmitter<MouseEvent>();

    protected ToogleSideNave(event: MouseEvent): void {
        this.isLoading = true;
        this.onClick.emit(event);
        isMenuOpenSIGNAL.set(!isMenuOpenSIGNAL());
        Tools.Sleep(500, 'ToogleSideNave').then(() => this.isLoading = false);
    }
}