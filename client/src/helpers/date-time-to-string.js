import moment from 'moment-timezone';

/**
 * format a DateTime object for displaying.
 * 
 * @since 2.0.0
 * 
 * @param {DateTime} dateTime - date time object to format 
 * @returns {String} - formatted date time
 */
export default function dateTimeToString(dateTime) {
    return moment
        .utc(dateTime)
        .tz('US/Eastern')
        .format('dddd, MMMM D, YYYY - hh:mm a z')
}