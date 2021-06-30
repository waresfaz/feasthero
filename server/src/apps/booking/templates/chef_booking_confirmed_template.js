function chefBookingConfirmedEmailTemplate(emailData) {
    return `
    <p>Hi <b>${emailData.chef_name}</b>, Your class <b>${emailData.class_name}</b>  has been booked  for the slot </p>
    <p> Date: <b> ${emailData.booking_date} </b></p>
    <p>Time: <b>${emailData.booking_time} EST </b></p> 
     `
}

module.exports = chefBookingConfirmedEmailTemplate;