export class Colors {

    public static readonly blue   = '#0d6efd';
    public static readonly gray   = '#6c757d';
    public static readonly green  = '#198754';
    public static readonly yellow = '#ffc107';
    public static readonly red    = '#dc3545';
    public static readonly white  = '#f5f5f5';
    public static readonly black  = '#252525';
    public static readonly orange = '#fd6031';
    public static readonly purple = '#a615bc';


    /** Returns the color palette in hexadecimal */
    private static readonly colorsHex = new Map<string, string>([
        ['blue'  , '#0d6efd'],
        ['gray'  , '#6c757d'],
        ['green' , '#198754'],
        ['yellow', '#ffc107'],
        ['red'   , '#dc3545'],
        ['white' , '#f5f5f5'],
        ['black' , '#252525'],
        ['orange', '#fd6031'],
        ['purple', '#a615bc'],
    ]);


    /** Returns the color palette in RGB */
    private static readonly ColorsRGB = new Map<string, number[]>([
        ['blue',           [13,  110, 253]],
        ['gray',           [108, 117, 125]],
        ['green',          [25,  135, 84 ]],
        ['yellow',         [225, 193, 7  ]],
        ['red',            [220, 53 , 69 ]],
        ['white',          [245, 245, 245]],
        ['black',          [37 , 37 , 37 ]],
        ['orange',         [253, 96 , 49 ]],
        ['purple',         [166, 21,  188]],
    ]);


    /** Returns a random color in hexadecimal */
    public static GetRandomColorHex = (): string => "#xxxxxx".replace(/x/g, () => (Math.random() * 16 | 0).toString(16));


    /** Returns the number of colors requested */
    public static GetColorHexList(quantity: number): string[] {
        const colors: string[] = [];
        let counter: number = 0;

        while (counter < quantity) {
            for (const color of this.colorsHex.values()) {
                colors.push(color);
                if (++counter === quantity) break;
            }
        }

        return colors;
    }


    /** Returns the number of colors requested with opacity */
    public static GetColorRGBList(quantity: number): string[] {
        const colors: string[] = [];

        let alpha: number = 1.0;
        let counter: number = 0;
        let lastColor = [...Array.from(this.ColorsRGB.keys())].pop();

        while (counter < quantity) {
            for (const [color, value] of this.ColorsRGB.entries()) {
                colors.push(`rgba(${value[0]}, ${value[1]}, ${value[2]}, ${alpha})`);

                if (color === lastColor) alpha -= 0.2;
                if (++counter === quantity) break;
            }
        }

        return colors;
    }
}