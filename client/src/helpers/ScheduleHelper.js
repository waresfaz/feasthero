import moment from "moment";
import "moment-timezone";
export default function scheduleHelper(array) {
  // getting the date 7 days from current selected date
  let WEEK_FROM = moment
    .utc(new Date().toISOString())
    .tz("US/Eastern")
    .add(7, "d")
    .format("YYYY-MM-DD");

  // getting the date 12 weeks from current selected date
  let WEEK_TO = moment
    .utc(new Date().toISOString())
    .tz("US/Eastern")
    .add(12, "w")
    .format("YYYY-MM-DD");

  // looping through available dates
  let datetimesArray = [];
  for (let elem of array) {
    let date = moment
      .utc(new Date(elem.date).toISOString())
      .tz("US/Eastern")
      .format("YYYY-MM-DD");

    if (
      moment(date).isSameOrAfter(WEEK_FROM) &&
      moment(date).isSameOrBefore(WEEK_TO)
    ) {
      datetimesArray.push(
        moment
          .utc(elem.date)
          .tz("US/Eastern")
          .format("dddd, MMMM D, YYYY - hh:mm a")
      );
    }
  }

  const datetimes = datetimesArray.map((datetime) => {
    return <option key={datetime}> {datetime} EST</option>;
  });

  return datetimes;
}
