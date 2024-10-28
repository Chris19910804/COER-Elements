import { IGridCoerSwitch, IGridCoerTextBox, IGridItem } from "coer-elements/interfaces";

export const GridTemplates = {

    /** Template for boolean property */
    isActiveTemplate: (item: IGridItem<any>): string => {
        if (item.value) {
            return `
                <span class='text-green-bold'>
                    <i class="fa-solid fa-circle-check"></i> Active
                </span>
            `;
        }

        else {
            return `
                <span class='text-gray-bold'>
                    <i class="fa-solid fa-circle-minus"></i> Disabled
                </span>
            `;
        }
    },


    /** Template for boolean property */
    coerSwitchTemplate: (item: IGridItem<any>): IGridCoerSwitch => ({
        isInput: true,
        tooltip: `${item.value ? 'Active' : 'Disabled' }`
    }),


    /** Template for text property */
    coerTextboxTemplate: (item: IGridItem<any>): IGridCoerTextBox => ({
        isInput: true,
        isInvalid: item.value.length <= 0
    }),


    /** Template for text property */
    coerIconTemplate: (icon: string, color: string = 'black'): string => {
        return `<i class='${icon} d-block w-100 text-center' style='color: ${color};'></i>`;
    }
}