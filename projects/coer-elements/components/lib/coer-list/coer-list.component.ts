import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, computed, input, output } from '@angular/core'; 
import { Tools } from 'coer-elements/tools';

@Component({
    selector: 'coer-list',
    templateUrl: './coer-list.component.html',
    styleUrl: './coer-list.component.scss',
})
export class CoerList<T> { 

    //Inputs
    public dataSource = input<T[]>([]);
    public propDisplay = input<string>('name');
    public showDeleteButton = input<boolean>(false);
    public showGoButton = input<boolean>(false);
    public isLoading = input<boolean>(false);
    public isDraggable = input<boolean>(false);

    //Outputs
    public onDrop = output<T>(); 
    public onSort = output<T[]>(); 
    public onClick = output<T>();
    public onDoubleClick = output<T>();
    public onClickDelete = output<T>();
    public onClickGo = output<T>();

    //computed
    protected _dataSource = computed(() => {
        let index = 0;        
        return Tools.BreakReference(this.dataSource())
            .map((item: any) => Object.assign(item, { index: index++ }));
    });


    //computed
    protected _isDraggable = computed(() => {
        return this.isDraggable() && !this.isLoading();
    });


    //computed
    protected _showDeleteButton = computed(() => {
        return this.showDeleteButton() && !this.isLoading();
    });


    //computed
    protected _showGoButton = computed(() => {
        return this.showGoButton() && !this.isLoading();
    });


    /** */
    protected GetDisplay = (item: any): string => {
        return Tools.IsNotNull(item) ? item[this.propDisplay()] : '';
    }


    /** */
    protected GetIndexRow = (item: any): number => {
        return item['index'];
    }


    /** */
    protected Drop(event: CdkDragDrop<T[]>): void {
        const { previousIndex, currentIndex } = event;        
        let dataSource = Tools.BreakReference(this.dataSource());
        const item = Tools.BreakReference(dataSource[previousIndex]);
        dataSource.splice(previousIndex, 1);
        dataSource.splice(currentIndex, 0, item); 
        this.onSort.emit(dataSource);
        this.onDrop.emit(item);
    }
}