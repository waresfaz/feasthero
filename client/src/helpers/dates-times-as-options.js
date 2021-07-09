var dateFormat = require('dateformat');

function datesTimesAsOption(datesTimes) {
    const format = "dddd, mmmm dS, yyyy - h:MMtt Z";
    return datesTimes.map(classDateTime => {
        const dateTime = dateFormat(new Date(classDateTime.dateTime), format);
        return {
            name: 'selectedClassDateTime',
            value: dateTime,
            label: dateTime,
        }
    })
}

export default datesTimesAsOption;