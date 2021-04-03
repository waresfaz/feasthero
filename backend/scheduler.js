const { connect, close } = require("./db-connect");
const Class = require("./schema/Class");
const Booking = require("./schema/Booking");
const { mailSender } = require("./api-handler/api-helper");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const moment = require("moment");
const { utc } = require("moment");
require("moment-timezone");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// basic msg template
let msg = {
  to: null,
  from: process.env.SENDGRID_MAIL,
  subject: "Reminder - FeastHero Class Scheduled for tomorrow  ",
  html: null,
};

const sendReminder = async () => {
  await connect();
  try {
    // fetching all bookings which are scheduled for the next day
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

    // looping over this list , getting the class details and sending a reminder mail to the recipient
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
            recipe: 1,
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

      /*============================= SENDING REMINDER MAIL TO THE CUSTOMER ================================*/
      msg.to = reminder_list[data].customer_email;
      msg.html = `Hi <b>${
        reminder_list[data].customer_first_name
      }</b>, this is a reminder mail about your cooking class scheduled for tomorrow.
         <p>
          Here’s everything you need to know for your class with <b>${
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
         <p> Remember for this class you will need  ${classes.recipe.toString()}. </p>

        <h4>  We look forward to having you join!</h4>
         `;
      await mailSender(msg);

      /*============================= SENDING REMINDER MAIL TO THE CHEF ================================*/
      msg.to = classes.chefs[0].email;
      msg.html = `Hi <b>${
        classes.chefs[0].name
      }</b>, this is a reminder mail about your cooking class scheduled for tomorrow.        
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
         `;
      await mailSender(msg);
    }
  } catch (e) {
    console.log(e);
  }
  close();
};
sendReminder();
