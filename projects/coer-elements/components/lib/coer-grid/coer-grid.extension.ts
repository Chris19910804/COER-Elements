import { IGridButtonByRow, IGridColumn, IGridDataSource, IGridImport, IGridHeaderButton, IGridHeaderExportButton, IGridKeyupEnter, IGridSearch, IGridInputSwitchChange, IGridInputTextbox, IGridSort, IGridCheckbox, IGridInputCheckbox, IGridHeader } from "coer-elements/interfaces";
import { AfterViewInit, Component, ElementRef, Input, computed, inject, input, output, signal, viewChild, viewChildren } from "@angular/core";
import { CoerCheckbox } from "../../lib/coer-checkbox/coer-checkbox.component";
import { CoerNumberBox } from "../../lib/coer-numberbox/coer-numberbox.component";
import { CoerSelectbox } from "../../lib/coer-selectbox/coer-selectbox.component";
import { CoerTextBox } from "../../lib/coer-textbox/coer-textbox.component";
import { CoerAlert, ControlValue, DateTime, Screen, Tools } from 'coer-elements/tools';

@Component({
    selector: 'coer-grid-extension',
    template: ''
})
export class CoerGridExtension<T> extends ControlValue implements AfterViewInit {

    //Injections
    protected readonly alert = inject(CoerAlert);

    //Elements
    protected inputFile = viewChild.required<ElementRef>('inputFileRef');
    protected inputSearch = viewChild.required<CoerTextBox>('inputSearch');
    protected coerTextboxList = viewChildren(CoerTextBox);
    protected coerNumberboxList = viewChildren(CoerNumberBox);
    protected coerSelectboxList = viewChildren(CoerSelectbox);
    protected coerCheckboxList = viewChildren(CoerCheckbox);

    //Variables
    protected override _value: T[] = [];
    protected value_signal = signal<T[]>([]);
    protected _gridSearch = signal<string | number>('');
    protected _isLoading: boolean = true;
    protected _isLoadingMessage: boolean = true;
    protected _id: string = Tools.GetGuid('coer-grid');
    protected _expandedGroups: string[] = [];
    protected _enableAnimations: boolean = false;
    protected _indexFocus = signal<number>(0);
    protected _sort = signal<IGridSort>({ columnName: '', direction: 'none', icon: '' });

    //Generic Tools
    protected GetNumericFormat = Tools.GetNumericFormat;
    protected GetDateFormat = DateTime.GetDateFormat;

    //Inputs
    public columns = input<IGridColumn<T>[]>([]);
    public cleanColumnName = input<boolean>(true);
    @Input() addButton: IGridHeaderButton = { show: false };
    @Input() exportButton: IGridHeaderExportButton = { show: false };
    @Input() importButton: IGridHeaderButton = { show: false };
    @Input() search: IGridSearch = { show: false, ignore: false };
    @Input() buttonByRow: IGridButtonByRow<T> = {};
    @Input() checkbox: IGridCheckbox = { show: false };
    public tooltipByRow = input<string>('');
    public isLoading = input<boolean>(false);
    public isDisabled = input<boolean>(false);
    public rowsByPage = input<number>(50);
    public groupBy = input<string>('');
    public showColumnGrouped = input<boolean>(false);
    public rowsByGroup = input<number>(50);
    public isInvisible = input<boolean>(false);
    public showFooter = input<boolean>(true);
    public width = input<string>('100%');
    public MinWidth = input<string>('250px');
    public MaxWidth = input<string>('100%');
    public height = input<string>('350px');
    public minHeight = input<string>('140px');
    public maxHeight = input<string>('100vh');
    public margin = input<string>('auto');
    public enableSort = input<boolean>(true);
    public enableRowFocus = input<boolean>(true);

    //Outputs
    public onClickAdd = output<void>();
    public onClickImport = output<IGridImport<T>>();
    public onClickExport = output<T[]>();
    public onClickRow = output<T>();
    public onDoubleClickRow = output<T>();
    public onClickDeleteRow = output<T>();
    public onClickEditRow = output<T>();
    public onClickGoRow = output<T>();
    public onKeyupEnter = output<IGridKeyupEnter>();
    public onKeyupEnterLast = output<void>();
    public onSwitchChange = output<IGridInputSwitchChange<T>>();
    public onTextboxChange = output<IGridInputTextbox<T>>();
    public onSelectboxChange = output<IGridInputTextbox<T>>();
    public onCheckboxChange = output<IGridInputCheckbox<T>>();

    //computed
    protected _isDisabled = computed<boolean>(() => {
        return this.isDisabled() || this.isLoading() || this.isInvisible();
    });

    //computed
    protected _isGrouped = computed<boolean>(() => {
        return this.groupBy().length > 0;
    });

    //getter
    protected get _height(): string {
        let height = this.height();

        if (height == 'full' || height == 'full-form') {
            const TOOLBAR = 45;
            const PAGE_HEADER = 70;
            const FORM = (height == 'full-form') ? 70 : 0;
            const GRID_HEADER = document.getElementById(`${this._id}-header`)!;
            const HEADER = (GRID_HEADER && GRID_HEADER.children.length > 0) ? 50 : 0;
            const MARGIN = 30;
            const PADDING = 20;
            const FOOTER = this.showFooter() ? 24.5 : 0;
            height = (Screen.WINDOW_HEIGHT - TOOLBAR - PAGE_HEADER - MARGIN - FORM - HEADER - PADDING - FOOTER) + 'px';
        }

        return height;
    }


    //getter
    protected get _onlyOneCheck() {
        return Tools.IsNotNull(this.checkbox.onlyOneCheck) && this.checkbox.onlyOneCheck;
    }


    ngAfterViewInit(): void {
        Tools.Sleep().then(() => {
            this._enableAnimations = true;
            this._isLoading = false;
            this._isLoadingMessage = false;
        });
    }

    //ControlValueAccessor
    public override SetValue(value: T[]): void {
        let indexRow = 0;
        if(!Tools.IsNotNull(value)) value = [];

        const dataSource = Tools.BreakReference(value).map((item: any) =>
            Object.assign({ checked: false }, { ...item }, { indexRow: indexRow++ })
        );

        this._UpdateValue(dataSource);
        this._value = dataSource;
        this.value_signal.set(dataSource);
    }


    //ControlValueAccessor
    public override writeValue(value: T[]): void {
        let indexRow = 0;
        if(!Tools.IsNotNull(value)) value = [];

        const dataSource = Tools.BreakReference(value).map((item: any) =>
            Object.assign({ checked: false }, { ...item }, { indexRow: indexRow++ })
        );

        this._value = dataSource;
        this.value_signal.set(dataSource);
    }


     //computed
     protected gridColumns = computed<IGridHeader[]>(() => {
        const SET_COLUMNS = new Set<string>();

        //Has filter columns?
        if (this.columns().length > 0) {
            for (const { property } of this.columns()) {
                SET_COLUMNS.add(property);
            }
        }

        //Get all columns
        else for (const row of this.value_signal()) {
            for (const property in row) {
                SET_COLUMNS.add(property);
            }
        }

        //Remove indexRow column
        if (SET_COLUMNS.has('indexRow')) {
            SET_COLUMNS.delete('indexRow');
        }

        //Remove groupBy column
        if (this._isGrouped() && !this.showColumnGrouped() && SET_COLUMNS.has(this.groupBy())) {
            SET_COLUMNS.delete(this.groupBy());
        }

        //Set index column
        let indexColumn = 0;
        return Array.from(SET_COLUMNS).map(property => Tools.BreakReference<IGridHeader>({
            columnName: property,
            indexColumn: indexColumn++,
            width: this._GetColumnConfig(property)?.width || 'auto'
        }));
    });


    //computed
    protected gridDataSource = computed<IGridDataSource[]>(() => {
        let list = this.gridDataSourceFiltered();

        //It's Grouped?
        if (this._isGrouped()) {
            //let indexRow = 0;
            let indexGroup = 0;

            const SET_COLUMN = new Set<string>();
            for (const row of list as any) {
                SET_COLUMN.add(row[this.groupBy()]);
            }

            const DATA_SOURCE_GROPUED = [];
            for (const column of SET_COLUMN) {
                DATA_SOURCE_GROPUED.push({
                    groupBy: column,
                    indexGroup: indexGroup++,
                    length: list.filter((item: any) => item[this.groupBy()] == column).length,
                    rows: [...list]
                        .filter((item: any) => item[this.groupBy()] == column)
                        .splice(0, this.rowsByGroup())
                        //.map((item: any) => Object.assign({ indexRow: indexRow++ }, item))
                });
            }

            //Response by group
            return [...DATA_SOURCE_GROPUED].splice(0, this.rowsByPage());
        }

        //Response
        return [{
            groupBy: 'Not Grouped',
            indexGroup: -1,
            length: -1,
            rows: [...list].splice(0, this.rowsByPage())
        }];
    });


    //computed
    protected gridDataSourceFiltered = computed<T[]>(() => {
        let list: T[] = [];

        const dataSource = Tools.BreakReference(this.value_signal());

        //Ignore Filter
        if (this._gridSearch() == '' || this.search?.ignore) {
            list = dataSource;
        }

        //Filter by search
        else {
            const SET_ROW = new Set<number>();

            let listFiltered: any[] = [];
            for(const { columnName } of this.gridColumns()) {
                listFiltered = dataSource.filter((item: any) =>
                    !SET_ROW.has(item['indexRow'])
                    && String(item[Tools.FirstCharToLower(columnName)]).trim().toUpperCase().includes(String(this._gridSearch()).trim().toUpperCase())
                );

                for(const { indexRow } of listFiltered as any) {
                    SET_ROW.add(indexRow);
                }

                list = Tools.BreakReference(list.concat(listFiltered));
            }
        }

        return Tools.BreakReference(list);
    });


    /** Get Column Configuration */
    protected _GetColumnConfig = (columnName: string): IGridColumn<T> | undefined => {
        return this.columns().find(x => x.property.replaceAll(' ', '').toUpperCase() == columnName.replaceAll(' ', '').toUpperCase());
    }


    /** Clean Name or get alias */
    protected _GetColumnName = (columnName: string): string => {
        const columnConfig = this._GetColumnConfig(columnName);

        //Get Alias
        if (columnConfig && columnConfig.alias && columnConfig.alias.length > 0) {
            return columnConfig.alias;
        }

        //Clean headerName
        if (this.cleanColumnName() && columnName.length > 0) {
            columnName = Tools.FirstCharToLower(columnName);

            const charArray = [];
            for(const char of columnName) {
                if(char === char.toUpperCase()) charArray.push(' ');
                charArray.push(char);
            }

            charArray[0] = charArray[0].toUpperCase();
            columnName = charArray.join('');
        }

        return columnName.trim();
    }


    /** */
    protected _GetShortIcon = (columnName: string) => {
        return this._sort().columnName == columnName ? this._sort().icon : '';
    }


    /** */
    protected _GetId = (indexRow: number, indexColumn: number, suffix: string = ''): string => {
        if (suffix.length > 0) suffix = `-${suffix}`;
        return `${this._id}-row${indexRow}column${indexColumn}${suffix}`;
    }


    /** */
    protected _GetCellValue = (row: any, columnName: string): any => {
        return row[Tools.FirstCharToLower(columnName).replaceAll(' ', '')];
    }


    /** */
    protected _GetTooltip = (prefix: string, row: any, suffix: string = ''): string => {
        let column = Tools.FirstCharToLower(this.tooltipByRow()).replaceAll(' ', '');

        if (suffix.length > 0) {
            suffix = ` ${suffix}`;
        }

        return this.tooltipByRow().length > 0
            ? `${prefix} ${row[column]}${suffix}`
            : `${prefix}${suffix}`;
    }


    /** */
    protected _HideRow = (group: IGridDataSource): boolean => {
        return (this._isGrouped() ? !(this._expandedGroups.some(x => x == group.groupBy)) : false)
    }


    /** */
    protected _IsCellType(property: string, data: any, type: 'number' | 'date' | 'template' | 'coerTextbox' | 'coerNumberbox' | 'coerSelectbox'  | 'coerSwitch'): boolean {
        let response = false;
        const columnConfig = this._GetColumnConfig(property);
        const value = data[property];
        const row = Tools.BreakReference(data);

        if (columnConfig) {
            if (['coerTextbox', 'coerNumberbox', 'coerSelectbox', 'coerSwitch'].includes(type)) {
                const inputConfig: any = columnConfig;
                response = inputConfig.hasOwnProperty(type)
                    && typeof inputConfig[type] === 'function'
                    && inputConfig[type]({ property, row, value }).isInput;
            }

            else switch(type) {
                case 'number': {
                    if (typeof columnConfig.typeNumber === 'boolean') {
                        response = columnConfig.typeNumber;
                    }

                    else if (typeof columnConfig.typeNumber === 'function') {
                        response = (data === null) ? false : columnConfig.typeNumber({ property, row, value });
                    }

                    break;
                }

                case 'date': {
                    if (data === null) return false;

                    if (typeof columnConfig.typeDate === 'boolean') {
                        response = columnConfig.typeDate;
                    }

                    else if (typeof columnConfig.typeDate === 'function') {
                        response = (data === null) ? false : columnConfig.typeDate({ property, row, value });
                    }

                    break;
                }

                case 'template': {
                    if (data === null) return false;
                    response = (typeof columnConfig.template === 'string') || (typeof columnConfig.template === 'function');
                    break;
                }
            }
        }

        return response;
    }


    /** */
    protected _IsCellColor(property: string, data: any, color: 'colorBlue' | 'colorGreen' | 'colorYellow' | 'colorRed'): boolean {
        let response = false;
        const columnConfig: any = this._GetColumnConfig(property);

        if (columnConfig) {
            if (typeof columnConfig[color] === 'boolean') {
                response = columnConfig[color];
            }

            else if (typeof columnConfig[color] === 'function') {
                response = columnConfig[color]({
                    property,
                    row: Tools.BreakReference(data),
                    value: data[property]
                });
            }
        }

        return response;
    }


    /** */
    protected GetAttribute(property: string, data: any, attribute: string, type: 'coerSwitch' | 'coerTextbox' | 'coerNumberbox'| 'coerSelectbox' | 'defaul-cell' ): any {
        const columnConfig = this._GetColumnConfig(property);
        const value = Tools.IsNotNull(data) ? data[property] : null;
        const row = Tools.BreakReference(data);

        if (columnConfig) {
            if (type === 'defaul-cell') {
                switch(attribute) {
                    case 'textAlign': {
                        return columnConfig?.textAlign || 'left';
                    }

                    case 'template': {
                        const inputConfig: any = columnConfig;

                        if (inputConfig.hasOwnProperty(attribute)) {
                            if(typeof inputConfig[attribute] === 'string') {
                                return inputConfig[attribute];
                            }

                            else if(typeof inputConfig[attribute] === 'function') {
                                return inputConfig[attribute]({ property, row, value }) || '';
                            }
                        }
                    }
                }
            }

            else if(['coerTextbox', 'coerNumberbox', 'coerSelectbox', 'coerSwitch'].includes(type)) {
                const inputConfig: any = columnConfig;
                if (inputConfig.hasOwnProperty(type) && typeof inputConfig[type] === 'function') {
                    return inputConfig[type]({ property, row, value })[attribute] || null;
                }
            }
        }

        return null;
    }


    /** */
    protected ButtonByRow(property: 'showDeleteButton' | 'showEditButton' | 'showGoButton', data: any = null): boolean {
        let response = false;
        const buttonByRow: any = this.buttonByRow;
        const row = Tools.IsNotNull(data) ? Tools.BreakReference(data) : null;

        if (buttonByRow.hasOwnProperty(property)) {
            if (row === null) {
                response = (typeof buttonByRow[property] === 'boolean') ? buttonByRow[property] : true;
            }

            else if (typeof buttonByRow[property] === 'boolean') {
                response = buttonByRow[property];
            }

            else if (typeof buttonByRow[property] === 'function') {
                response = buttonByRow[property]({ property, row, value: null });
            }
        }

        return response ? (this._value && this._value.length > 0) : false;
    }
}