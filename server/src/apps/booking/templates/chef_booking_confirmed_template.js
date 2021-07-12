const moment = require('moment');

function chefBookingConfirmedEmailTemplate(emailData) {
    return `
    <p>Hi <b>${emailData.chefName}</b>, Your class <b>${emailData.className}</b>  has been booked  for the slot </p>
    <p> Date: <b> ${emailData.bookingDate} </b></p>
    <p>Time: <b>${moment
            .utc(emailData.bookingTime)
            .tz("US/Eastern")
            .format("hh:mm a")} EST </b></p> 
     `
}

module.exports = chefBookingConfirmedEmailTemplate;