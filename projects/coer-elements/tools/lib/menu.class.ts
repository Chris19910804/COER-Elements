import { IMenuOptionSelected } from "coer-elements/interfaces";

export class Menu {

    private static readonly storage = 'COER-System';

    /** */
    public static SetSelectedOption(menu: IMenuOptionSelected): void {
        let storage = sessionStorage.getItem(this.storage) as any;
        if (storage) storage = JSON.parse(storage);
        storage = Object.assign({}, storage, { menu });
        sessionStorage.setItem(this.storage, JSON.stringify(storage));
    }


    /** */
    public static GetSelectedOption(): IMenuOptionSelected | null {
        let storage = sessionStorage.getItem(this.storage) as any;

        if (storage) {
            storage = JSON.parse(storage);

            if (storage.hasOwnProperty('menu')) {
                return storage.menu;
            }
        }

        return null;
    }
}