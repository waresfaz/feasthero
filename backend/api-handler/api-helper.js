const Class = require("../schema/Class");
const Chef = require("../schema/Chef");
const Schedule = require("../schema/Schedule");
const Booking = require("../schema/Booking");
var ObjectId = require("mongoose").Types.ObjectId;

const moment = require("moment");
const { utc } = require("moment");
require("moment-timezone");

const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// updates the date-time slot  in schedules collection to available = true/ false
const updateSlot = async (class_id, date, value) => {
  let BookSlot = await Schedule.updateOne(
    {
      class_id: ObjectId(class_id),
      $and: [
        {
          date: { $gte: new Date(date) },
        },
        {
          date: {
            $lt: new Date(moment(date).add(1, "hour")),
          },
        },
      ],
    },
    { available: value }
  );
  return;
};

// updates the booking_status in bookings collection to success/failed/cancelled
const updateBookingStatus = async (order_id, status) => {
  let updatedStatus = await Booking.updateOne(
    {
      _id: ObjectId(order_id),
    },
    status
  );

  return;
};

const sendMailToRecipient = async (order) => {
  //fetching the class details to send the email
  let classes = await Class.aggregate([
    {
      $match: { _id: order[0].class_id },
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

  // message template
  const msg = {
    to: order[0].customer_email,
    from: process.env.SENDGRID_MAIL, // Use the email address or domain you verified above
    bcc: process.env.SENDGRID_MAIL,
    subject: "FeastHero Class Booking Confirmation",
    html: `Hi <b>${
      order[0].customer_first_name
    }</b>, thanks for booking with FeastHero!.
       <p>
        Here’s everything you need to know for you class with ${
          classes.chefs[0].name
        }:<p>
  
        <p>
        Class name: <b>${classes.title}</b></p>
        <p>
        Date: <b> ${moment
          .utc(order[0].booking_datetime)
          .tz("US/Eastern")
          .format("dddd, MMMM D,YYYY")} </b></p>
          <p>
        Time: <b>${moment
          .utc(order[0].booking_datetime)
          .tz("US/Eastern")
          .format("hh:mm a")} EST </b></p>
          <h3>
        Join with this link: <a href=${order[0].zoom_link}> ${
      order[0].zoom_link
    } </a> </h3>
  <br>
        <p>
        ${classes.description}
  </p>
       <p> Remember for this class you will need ${classes.recipe.toString()}. </p>
  
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

  sendMailToChef(classes, order[0]);
};

const sendMailToChef = async (classes, order) => {
  // message template
  const msg = {
    to: classes.chefs[0].email,
    from: process.env.SENDGRID_MAIL, // Use the email address or domain you verified above
    bcc: process.env.SENDGRID_MAIL,
    subject: ` FeastHero Class ${classes.title}  Slot Booked`,
    html: `Hi <b>${classes.chefs[0].name}</b>, Your class <b>${
      classes.title
    }</b>  has been booked  for the slot 
    <p>
    Date: <b> ${moment
      .utc(order[0].booking_datetime)
      .tz("US/Eastern")
      .format("dddd, MMMM D,YYYY")} </b></p>
      <p>
    Time: <b>${moment
      .utc(order[0].booking_datetime)
      .tz("US/Eastern")
      .format("hh:mm a")} EST </b></p> 
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
};

module.exports = {
  sendMailToRecipient,
  sendMailToChef,
  updateSlot,
  updateBookingStatus,
};
