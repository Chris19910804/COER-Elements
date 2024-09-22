import { Tools } from "./tools";
import * as XLSX from 'xlsx';

export class Files {
    public static readonly EXCEL_EXTENSIONS: string[] = ['xls', 'xlsx', 'csv'];

    /** Get Extension File */
    public static GetExtension(file: File): string | null {
        const fileName = file.name;

        if (fileName.includes('.')) {
            let worlds = fileName.split('.') as string[];

            if (worlds.length > 0) {
                let extension = worlds.pop()!;
                extension = extension.trim().toLowerCase();
                if (extension.length > 0) return extension;
            }
        }

        return null;
    }


    /** Is Excel File */
    public static IsExcel(file: File): boolean {
        const EXTENSION = Files.GetExtension(file);

        return Tools.IsNotNull(EXTENSION)
            ? this.EXCEL_EXTENSIONS.includes(EXTENSION!)
            : false;
    }


    /** Read excel file */
    public static ReadExcel<T>(file: File) {
        return new Promise<{ columns: string[]; rows: T[]; }>(Resolve => {
            let columns: string[] = [];
            let rows: T[] = [];

            const reader = new FileReader();
            reader.readAsArrayBuffer(file);

            reader.onload = () => {
                const dataBytes = new Uint8Array(reader.result as any);

                if (dataBytes) {
                    const workbook = XLSX.read(dataBytes, {});
                    const sheet = workbook.Sheets[workbook.SheetNames[0]];
                    let dataSheet: any[] = XLSX.utils.sheet_to_json(sheet, {
                        header: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
                    });

                    //Get Headers
                    for(const column in dataSheet[0]) {
                        columns.push(Tools.FirstCharToLower(String(dataSheet[0][column]).replaceAll(' ', '')));
                    }

                    //Get Rows
                    rows = XLSX.utils.sheet_to_json(sheet, { header: columns });
                    rows.shift();

                    rows = rows.map(row => {
                        const item = Tools.BreakReference<any>(row);
                        delete item['__rowNum__'];
                        return item;
                    });
                }

                Resolve({ columns, rows });
            }

            reader.onerror = () => { Resolve({ columns, rows }) }
        });
    }


    /** Export to excel file */
    public static ExportExcel<T>(data: T[], fileName: string = 'coer_report', sheetName: string = 'Sheet1') {
        sheetName = Tools.CleanUpBlanks(sheetName);
        fileName = Tools.CleanUpBlanks(fileName);

        if(fileName.endsWith('.xls') || fileName.endsWith('.xlsx') || fileName.endsWith('.csv')) {
            if (fileName.endsWith('.xls')) {
                fileName = fileName.replaceAll('.xls', '.xlsx');
            }

            if (fileName.endsWith('.csv')) {
                fileName = fileName.replaceAll('.csv', '.xlsx');
            }
        }

        else {
            fileName += '.xlsx';
        }

        const WORK_SHEET = XLSX.utils.json_to_sheet(data);
        const WORK_BOOK = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(WORK_BOOK, WORK_SHEET, sheetName);
        XLSX.writeFile(WORK_BOOK, fileName);
    }


    /** Convert file to string base64 */
    public static ConvertToBase64(file: File) {
        return new Promise<string>(Resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                Resolve(reader.result?.toString() || '');
            }

            reader.onerror = () => Resolve('');
        });
    }
}