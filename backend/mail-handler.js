const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: "prachitanayaktks@gmail.com",
  from: "bookings@feasthero.com", // Use the email address or domain you verified above
  subject: "Sending with Twilio SendGrid is Fun",
  html: `Hi sssss, thanks for booking with FeastHero!

  Here’s everything you need to know for you class with sss:
  
  Class name: sss
  Date: ssss
  Time: sss
  Join with this link:ssss
  ssss
  
  Remember for this class you will need ssss.
  
  We look forward to having you join!
  `,
};

const sendMail = async (msg) => {
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};

sendMail(msg);
