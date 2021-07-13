import dateTimeToString from './date-time-to-string';

function datesTimesAsOption(datesTimes) {
    let dateTimesResults = [];
    for (let dateTimeElem of datesTimes) {
        const dateTime = dateTimeToString(dateTimeElem.dateTime);
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
    return dateTimesResults;
}


export default datesTimesAsOption;