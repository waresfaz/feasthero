const { connect, close } = require("./db-connect");
const Class = require("./schema/Class");
const Booking = require("./schema/Booking");

const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const moment = require("moment");
const { utc } = require("moment");
require("moment-timezone");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendReminder = async () => {
  await connect();
  let reminder_list = await Booking.find({
    booking_status: "success",
    $and: [
      {
        booking_datetime: { $gte: moment.utc() },
      },
      {
        booking_datetime: {
          $lt: moment.utc(new Date()).add(1, "d"),
        },
      },
    ],
  });
  console.log(reminder_list, moment.utc());
  for (var data in reminder_list) {
    let classes = await Class.aggregate([
      {
        $match: { _id: reminder_list[data].class_id },
      },
      {
        $project: {
          title: 1,
          cost: 1,
          duration: 1,
          chef_id: 1,
          description: 1,
        },
      },
      {
        $lookup: {
          from: "chefs",
          localField: "chef_id",
          foreignField: "_id",
          as: "chefs",
        },
      },
    ]);
    classes = classes[0];
    const msg = {
      to: reminder_list[data].customer_email,
      from: process.env.SENDGRID_MAIL, // Use the email address or domain you verified above
      subject: "Reminder - FeastHero Class Scheduled for tomorrow  ",
      html: `Hi <b>${
        reminder_list[data].customer_first_name
      }</b>, this is a reminder mail about your cooking class scheduled for tomorrow.
       <p>
        Here’s everything you need to know for you class with <b>${
          classes.chefs[0].name
        }</b>:<p>

        <p>
        Class name: <b>${classes.title}</b></p>
        <p>
        Date: <b> ${moment
          .utc(reminder_list[data].booking_datetime)
          .tz("US/Eastern")
          .format("dddd, MMMM D,YYYY")} </b></p>
          <p>
        Time: <b>${moment
          .utc(reminder_list[data].booking_datetime)
          .tz("US/Eastern")
          .format("hh:mm a")} EST </b></p>
          <h3>
        Join with this link: <a href=${reminder_list[data].zoom_link}> ${
        reminder_list[data].zoom_link
      } </a> </h3>
  <br>
        <p>
        ${classes.description}
  </p>
       <p> Remember for this class you will need [recipes]. </p>

      <h4>  We look forward to having you join!</h4>
       `,
    };
    //ES6
    sgMail.send(msg).then(
      () => {},
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    );
  }
  close();
};
sendReminder();
