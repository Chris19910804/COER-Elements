import { Component } from '@angular/core';
import { Tools } from '../tools';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2'

@Component({
    selector: 'coer-alert',
    templateUrl: './coer-alert.component.html',
    styleUrls: ['./coer-alert.component.scss'],
    standalone: true
})
export class CoerAlert {

    /** */
    public Success(message: string | null = null, title: string | null = null, icon: string | null = null, autohide: number | null = 3000): void {
        //Title
        if (Tools.IsOnlyWhiteSpace(title)) title = 'Success';
        const alertSuccessTitle = document.getElementById('alert-success-title')!;
        alertSuccessTitle.textContent = title;

        //Icon
        icon = this.GetIcon(title!, icon, 'bi-check-circle fa-beat');
        const alertSuccessIcon = document.getElementById('alert-success-icon')!;
        this.SetIcon(alertSuccessIcon, icon);

        //Message
        if (Tools.IsNull(message)) message = '';
        const alertSuccessMessage = document.getElementById('alert-success-message')!;
        alertSuccessMessage.innerHTML = message!;

        //Toast
        const alertSuccess = document.getElementById('alert-success')!;
        this.SetAutoHide(alertSuccess, autohide);

        const toast = bootstrap.Toast.getOrCreateInstance(alertSuccess);
        toast.show();
    }


    /** */
    public Error(message: string | null = null, title: string | null = null, icon: string | null = null, autohide: number | null = 3000): void {
        //Title
        if (Tools.IsOnlyWhiteSpace(title)) title = 'Error';
        const alertErrorTitle = document.getElementById('alert-error-title')!;
        alertErrorTitle.textContent = title;

        //Icon
        icon = this.GetIcon(title!, icon, 'bi-exclamation-octagon fa-beat');
        const alertErrorIcon = document.getElementById('alert-error-icon')!;
        this.SetIcon(alertErrorIcon, icon);

        //Message
        if (Tools.IsNull(message)) message = '';
        const alertErrorBody = document.getElementById('alert-error-message')!;
        alertErrorBody.innerHTML = message!;

        //Toast
        const alertError = document.getElementById('alert-error')!;
        this.SetAutoHide(alertError, autohide);

        const toast = bootstrap.Toast.getOrCreateInstance(alertError);
        toast.show();
    }


    /** */
    public Info(message: string | null = null, title: string | null = null, icon: string | null = null, autohide: number | null = 3000): void {
        //Title
        if (Tools.IsOnlyWhiteSpace(title)) title = 'Info';
        const alertInfoTitle = document.getElementById('alert-info-title')!;
        alertInfoTitle.textContent = title;

        //Icon
        icon = this.GetIcon(title!, icon, 'bi-info-circle fa-beat');
        const alertInfoIcon = document.getElementById('alert-info-icon')!;
        this.SetIcon(alertInfoIcon, icon);

        //Message
        if (Tools.IsNull(message)) message = '';
        const alertInfoBody = document.getElementById('alert-info-message')!;
        alertInfoBody.innerHTML = message!;

        //Toast
        const alertInfo = document.getElementById('alert-info')!;
        this.SetAutoHide(alertInfo, autohide);

        const toast = bootstrap.Toast.getOrCreateInstance(alertInfo);
        toast.show();
    }


    /** */
    public Warning(message: string | null = null, title: string | null = null, icon: string | null = null, autohide: number | null = 3000): void {
        //Title
        if (Tools.IsOnlyWhiteSpace(title)) title = 'Warning';
        const alertWarningTitle = document.getElementById('alert-warning-title')!;
        alertWarningTitle.textContent = title;

        //Icon
        icon = this.GetIcon(title!, icon, 'bi-exclamation-triangle-fill fa-beat');
        const alertWarningIcon = document.getElementById('alert-warning-icon')!;
        this.SetIcon(alertWarningIcon, icon);

        //Message
        if (Tools.IsNull(message)) message = '';
        const alertWarningBody = document.getElementById('alert-warning-message')!;
        alertWarningBody.innerHTML = message!;

        //Toast
        const alertWarning = document.getElementById('alert-warning')!;
        this.SetAutoHide(alertWarning, autohide);

        const toast = bootstrap.Toast.getOrCreateInstance(alertWarning);
        toast.show();
    }


    /** */
    protected Close(alert: 'alert-success' | 'alert-error' | 'alert-info' | 'alert-warning') {
        return new Promise<void>(Resolve => {
            const element = document.getElementById(alert)!;
            const toast = bootstrap.Toast.getOrCreateInstance(element);
            toast.hide();

            setTimeout(() => { Resolve() }, 200);
        })
    }


    /** */
    public Confirm(
        message: string = 'Proceed?',
        alertType: 'warning' | 'danger' | 'success' | 'info' = 'warning',
        icon: string | null = null) {
        return new Promise<boolean>(Resolve => {
            let color: string;
            let iconType: 'warning' | 'error' | 'success' | 'info';
            switch(alertType) {
                case 'danger': {
                    if (Tools.IsNull(icon)) icon = 'bi-exclamation-octagon';
                    iconType = 'error';
                    color = '#dc3545'; //red
                    break;
                };

                case 'success': {
                    if (Tools.IsNull(icon)) icon = 'bi-check-circle';
                    iconType = 'info';
                    color = '#198754'; //green
                    break;
                };

                case 'info': {
                    if (Tools.IsNull(icon)) icon = 'bi-info-circle';
                    iconType = 'error';
                    color = '#0d6efd'; //blue
                    break
                };

                default: {
                    if (Tools.IsNull(icon)) icon = 'bi-exclamation-triangle-fill';
                    iconType = 'warning';
                    color = '#ffc107'; //yellow
                    break;
                }
            }

            switch(icon) {
                case 'delete': icon = 'fa-regular fa-trash-can'; break;
            }

            Swal.fire({
                icon: iconType,
                iconColor: 'transparent',
                iconHtml: `<i class="${icon}" style="color: ${color};"></i>`,
                html: message,
                showConfirmButton: true,
                confirmButtonText: 'Yes',
                confirmButtonColor: color,
                focusConfirm: true,
                showDenyButton: true,
                denyButtonColor: color,
                focusDeny: false,
                reverseButtons: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: true,
                customClass: {
                    denyButton: 'sweet-alert-button',
                    confirmButton: 'sweet-alert-button'
                }
            }).then(({ value }) => setTimeout(() => Resolve(value)));
        });
    }


    /** */
    private SetIcon(element: HTMLElement, icon: string): void {
        for (const item of [...element.classList.value.split(' ')]) {
            if (item.length > 0) {
                element.classList.remove(item);
                element.classList.remove('q');
            }
        }

        icon = icon.trim();
        const hasWhiteSpaces: RegExp = / /;
        if (hasWhiteSpaces.test(icon)) {
            const classes = icon.split(' ');
            for (const icon of classes) element.classList.add(icon);
        }

        else element.classList.add(icon);
    }


    /** */
    private SetAutoHide(element: HTMLElement, autohide: number | null): void {
        element.removeAttribute('data-bs-autohide');
        element.removeAttribute('data-bs-delay');

        if (autohide && autohide > 0) {
            if (autohide < 1000) autohide = 1000;
            element.setAttribute('data-bs-autohide', 'true');
            element.setAttribute('data-bs-delay', String(autohide));
        }

        else element.setAttribute('data-bs-autohide', 'false');
    }


    /** */
    private GetIcon(title: string, icon: string | null, iconDefault: string): string {
        if (icon == null || icon == '') {
            title = title.replaceAll(' ', '').toUpperCase();

            switch(title) {
                case 'ENABLED': return 'fa-solid fa-thumbs-up fa-flip-horizontal';
                case 'ACTIVE': return 'fa-solid fa-thumbs-up fa-flip-horizontal';
                case 'ACTIVED': return 'fa-solid fa-thumbs-up fa-flip-horizontal';
                case 'DISABLE': return 'fa-solid fa-thumbs-down fa-flip-horizontal';
                case 'DISABLED': return 'fa-solid fa-thumbs-down fa-flip-horizontal';
                case 'DELETE': return 'fa-regular fa-trash-can';
                case 'DELETED': return 'fa-regular fa-trash-can';
                default: return iconDefault;
            }
        }

        return icon;
    }
}