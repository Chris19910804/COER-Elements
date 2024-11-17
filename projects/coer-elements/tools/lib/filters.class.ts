import { IAppSource } from "coer-elements/interfaces";
import { Tools } from './tools';

export class Filters {

    private static readonly storage = 'COER-System';

    /** */
    public static Add<T>(filters: T, path: string): void {
        let storage = sessionStorage.getItem(this.storage) as any;
        storage = JSON.parse(storage);
        
        let dictionary: any[] = [[path, filters]];

        if(Tools.IsNotNull(storage?.filters)) {  
            if (!storage.filters.some((x: any[]) => x.some(y => y === path))) {
                storage.filters.concat(dictionary);
            }     
        } 

        storage = Object.assign({}, storage, { 
            filters: dictionary
        });

        sessionStorage.setItem(this.storage, JSON.stringify(storage));
    }


    /** */
    public static Get<T>(path: string): T | null  {
        let storage = sessionStorage.getItem(this.storage) as any;
        storage = JSON.parse(storage);

        if (Tools.IsNotNull(storage?.filters)) {

            for(const filterList of storage.filters) {                
                if (filterList.some((x: any) => x === path)) {
                    return filterList[1];
                }
            } 
        }

        return null; 
    }


    /** */
    public static Remove(path: string): void  {
        let storage = sessionStorage.getItem(this.storage) as any;
        storage = JSON.parse(storage);

        if (Tools.IsNotNull(storage?.filters)) { 

            let index = 0;
            for(index; index < storage.filters.length; index++) {
                if (storage.filters[index].some((x: any) => x === path)) {
                    break;
                }
            }

            storage.filters.splice(index, 1); 
        }   

        sessionStorage.setItem(this.storage, JSON.stringify(storage));
    }


    /** */
    public static RemoveAll(): void  {
        let storage = sessionStorage.getItem(this.storage) as any;
        storage = JSON.parse(storage);

        if (Tools.IsNotNull(storage?.filters)) {
            delete storage.filters;
        }   

        sessionStorage.setItem(this.storage, JSON.stringify(storage));
    }
}