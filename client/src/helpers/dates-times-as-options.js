import moment from 'moment';
import 'moment-timezone';

function datesTimesAsOption(datesTimes) {
    console.log(datesTimes)
    let dateTimesResults = [];
    for (let dateTimeElem of datesTimes) {
        const date = moment
            .utc(new Date(dateTimeElem.dateTime).toISOString())
            .tz('US/Eastern')
            .format('YYYY-MM-DD');
        if (shouldShowDate(date)) {
            const dateTime = moment
                .utc(dateTimeElem.dateTime)
                .tz('US/Eastern')
                .format('dddd, MMMM D, YYYY - hh:mm a z')
            dateTimesResults.push(
                {
                    target: {
                        name: 'selectedClassDateTime',
                        value: dateTime,
                    },
                    label: dateTime
                }

            );
        }
    }
    return dateTimesResults;
}

function shouldShowDate(date) {
    const WEEK_FROM = moment
        .utc(new Date().toISOString())
        .tz('US/Eastern')
        .add(7, 'd')
        .format('YYYY-MM-DD');

    const WEEK_TO = moment
        .utc(new Date().toISOString())
        .tz('US/Eastern')
        .add(12, 'w')
        .format('YYYY-MM-DD');

    return moment(date).isSameOrAfter(WEEK_FROM) &&
        moment(date).isSameOrBefore(WEEK_TO)
}

export default datesTimesAsOption;