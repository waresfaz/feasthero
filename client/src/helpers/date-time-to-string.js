import moment from 'moment-timezone';

/**
 * @summary format a DateTime object for displaying.
 * @param {DateTime} dateTime - date time object to format 
 * @returns {String} - formatted date time
 */
export default function dateTimeToString(dateTime) {
    return moment
        .utc(dateTime)
        .tz('US/Eastern')
        .format('dddd, MMMM D, YYYY - hh:mm a z')
}