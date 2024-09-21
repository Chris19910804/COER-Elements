import moment from "moment";

export class DateTime {
    /** Get UTC Offset */
    public static GetOffset(): number {
        return moment().utcOffset();
    }


    /** YYYY-MM-DD HH:mm:ss */
    public static GetFormatDB(date: string | Date | moment.Moment): string {
        if ((typeof date === 'string')) date = date.replaceAll('/', '-');
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }


    /** Convert UTC Date to Local Zone */
    public static ToLocalZone(date: string | Date | moment.Moment): string {
        date = DateTime.GetFormatDB(date);
        return moment(date).add(DateTime.GetOffset(), 'minutes').format('YYYY-MM-DD HH:mm:ss');
    }


    /** Convert Local Zone Date to UTC */
    public static ToUTC(date: string | Date | moment.Moment): string {
        date = DateTime.GetFormatDB(date);
        return moment(date).subtract(DateTime.GetOffset(), 'minutes').format('YYYY-MM-DD HH:mm:ss');
    }


    /** DD MMM YYYY */
    public static GetDateFormat(date: string | Date | moment.Moment): string {
        date = DateTime.GetFormatDB(date);
        return moment(date).parseZone().local(true).format('DD MMM YYYY');
    }
}