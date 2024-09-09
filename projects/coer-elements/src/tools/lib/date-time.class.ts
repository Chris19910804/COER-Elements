import moment from "moment";

export class DateTime {
    /** Get UTC Offset */
    public static GetOffset(): number {
        return moment().utcOffset();
    }


    /** Convert UTC Date to Local Zone */
    public static ToLocalZone(utcDate: string | Date | moment.Moment): string {
        return moment(utcDate).add(DateTime.GetOffset(), 'minutes').format('YYYY-MM-DD HH:mm:ss');
    }


    /** Convert Local Zone Date to UTC */
    public static ToUTC(utcDate: string | Date | moment.Moment): string {
        return moment(utcDate).subtract(DateTime.GetOffset(), 'minutes').format('YYYY-MM-DD HH:mm:ss');
    }


    /** DD MMM YYYY */
    public static GetDateFormat(date: string | Date | moment.Moment): string {
        if ((typeof date === 'string')) date = date.replaceAll('/', '-');
        return moment(date).parseZone().local(true).format('DD MMM YYYY');
    }
}