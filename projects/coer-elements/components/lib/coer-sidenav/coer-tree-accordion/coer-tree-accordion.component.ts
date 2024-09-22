import { Component, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IMenu, IMenuSelected, IMenuOptionSelected } from 'coer-elements/interfaces';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'coer-tree-accordion',
  templateUrl: './coer-tree-accordion.component.html',
  styleUrl: './coer-tree-accordion.component.scss'
})
export class CoerTreeAccordion {

    @ViewChild('expansionPanel') expansionPanel!: MatExpansionPanel;
    @ViewChildren(CoerTreeAccordion) menuList!: QueryList<CoerTreeAccordion>;

    //Variables
    public isExpanded: boolean = false;
    public isCollapsed: boolean = true;

    //Inputs
    @Input() level: number = 1;
    @Input() item!: IMenu;
    @Input() tree: IMenu[] = [];

    //Outputs
    @Output() clickMenuOption = new EventEmitter<IMenuOptionSelected>();
    @Output() clickMenu = new EventEmitter<IMenuSelected>();

    protected get _tree(): IMenu[] {
        return [...this.tree].concat([{...this.item}]);
    }

    protected get _icon(): string {
        return (this.item && this.item.hasOwnProperty('icon') && this.item.icon!.length > 0)
            ? this.item.icon! : 'fa-solid fa-bars';
    }


    protected get marginLeft(): string {
        return `${(this.level - 1) * 20}px`;
    }


    protected get identityClass(): string {
        let identity: string = '';

        for(let i = 0; i < this.tree.length; i++) {
            identity += `lv${i + 1}${this.tree[i].label}-`;
        }

        identity += `lv${this.level}${this.item.label}`;
        if(identity.includes(' ')) identity.replaceAll(' ', '');
        return identity.toLowerCase();
    }


    /** */
    protected IsActive = (element: Element): boolean => {
        return (this.isExpanded && this.level > 1)
            || (this.isCollapsed && element.classList.contains('active-link'))
    }


    /** */
    protected IsMenu = (item: IMenu): boolean => item.hasOwnProperty('items');


    /** */
    public Close(): void {
        if(this.isExpanded) {
            this.isExpanded = false;
            this.isCollapsed = true;
            this.expansionPanel.close();
        }
    }


    /** */
    public Open(): void {
        if(this.isCollapsed) {
            this.isExpanded = true;
            this.isCollapsed = false;
            this.expansionPanel.open();
        }
    }


    /** */
    protected Toggle(): void {
        this.isExpanded = !this.isExpanded;
        this.isCollapsed = !this.isCollapsed;

        this.clickMenu.emit({
            level: this.level,
            label: this.item.label,
            isExpanded: this.isExpanded,
            isCollapsed: this.isCollapsed,
            items: this.item.items,
            icon: this._icon,
            tree: [...this._tree]
        });
    }


    /** */
    protected ClickMenuOption(menuOption: IMenuOptionSelected): void {
        for(const menu of this.menuList.toArray()) {
            if(menu.item.label != menuOption.tree[this.level].label) {
                menu.Close();
            }
        }

        this.clickMenuOption.emit(menuOption);
    }


    /** */
    protected ClickMenu(menu: IMenuSelected): void {
        for(const menuLv2 of this.menuList.toArray()) {
            if (menuLv2.item.label != menu.label) menuLv2.Close();
        }

        this.clickMenu.emit(menu);
    }
}