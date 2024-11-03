import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, computed, EventEmitter, input, Output } from '@angular/core'; 
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

    //Outputs
    @Output() onClickDelete = new EventEmitter<T>();
    @Output() onDrop = new EventEmitter<T[]>(); 


    //computed
    protected _dataSource = computed(() => {
        let index = 0;        
        return Tools.BreakReference(this.dataSource())
            .map((item: any) => Object.assign(item, { index: index++ }));
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
        this.onDrop.emit(dataSource);
    }
}