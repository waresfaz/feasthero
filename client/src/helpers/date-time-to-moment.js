import moment from 'moment-timezone';

export default function dateTimeToMoment(dateTime) {
    return moment
        .tz(
            dateTime,
            'dddd, MMMM D, YYYY - hh:mm a z',
            "US/Eastern"
        )
        .utc();
}