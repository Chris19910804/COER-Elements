
import { Observable } from "rxjs";
import { IScreenSize } from "../../interfaces";

export class Screen {

    public static get WINDOW_WIDTH(): number {
        return window.innerWidth;
    }


    public static get WINDOW_HEIGHT(): number {
        return window.innerHeight;
    }


    public static get DEVICE_WIDTH(): number {
        return window.screen.width;
    }


    public static get DEVICE_HEIGHT(): number {
        return window.screen.height;
    }


    public static get BREAKPOINT(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' {
        if (window.innerWidth < 576) return 'xs';
        else if (window.innerWidth >= 576 && window.innerWidth < 768) return 'sm';
        else if (window.innerWidth >= 768 && window.innerWidth < 992) return 'md';
        else if (window.innerWidth >= 992 && window.innerWidth < 1200) return 'lg';
        else if (window.innerWidth >= 1200 && window.innerWidth < 1400) return 'xl';
        else return 'xxl';
    }


    /** */
    public static Resize = new Observable<IScreenSize>(subscriber => {
        window.addEventListener("load", () => {
            window.dispatchEvent(new Event('resize'));
        });

        window.onresize = () => {
            subscriber.next({
                width: this.WINDOW_WIDTH,
                height: this.WINDOW_HEIGHT,
                breakpoin: this.BREAKPOINT
            });
        }
    });
}