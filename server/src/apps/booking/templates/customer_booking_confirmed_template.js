function customerBookingConfirmedEmailTemplate(emailData) {
  return `<p>Hi <b>${emailData.first_name}</b>, thanks for booking with FeastHero!.</p>
     <p>Here’s everything you need to know for you class with ${emailData.chef_name}:<p>
      <p>Class name: <b>${emailData.class_name}</b></p>
      <p>Date: <b> ${emailData.booking_date} </b></p>
      <p>Time: <b>${emailData.booking_time} EST </b></p>
      <h3>Join with this link: <a href=${emailData.zoom_link}> ${emailData.zoom_link} </a> </h3>
      <br/>
      <p>${emailData.class_description}</p>
      <p> Remember for this class you will need ${emailData.recipe}. </p>
      <h4>  We look forward to having you join!</h4>
     `
}

module.exports = customerBookingConfirmedEmailTemplate;