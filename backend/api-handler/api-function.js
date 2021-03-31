const { connect, close } = require("../db-connect");
const Class = require("../schema/Class");
const Chef = require("../schema/Chef");
const Schedule = require("../schema/Schedule");
const Booking = require("../schema/Booking");
const moment = require("moment");
const { utc } = require("moment");
var ObjectId = require("mongoose").Types.ObjectId;
require("moment-timezone");
connect();

// query to get the data of all classes
const getClasses = async (req, res) => {
  try {
    let classes = await Class.aggregate([
      {
        $project: {
          _id: 1,
          title: 1,
          cost: 1,
          thumbnail: 1,
          description: 1,
          duration: 1,
          chef_id: 1,
          has_mealkit: 1,
          mealkit_price: 1,
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

    if (classes.length > 0) {
      return res.json({ success: true, data: classes });
    } else {
      return res.json({ success: true, data: classes });
    }
  } catch (e) {
    console.log(e);
    return res.json({ success: false, data: [] });
  }
};

// query to set the data of  classes
const setClass = async (req, res) => {
  let clasData = new Class(req.body);
  return clasData
    .save()
    .then((clasData) => {
      return res.status(200).json({ error: false, data: clasData._id });
    })
    .catch(async (err) => {
      return res.status(200).send({
        error: true,
        data: "Class insert Failed , please try again",
      });
    });
};

// query to get data of all chefs ==> not currently used
const getChefs = async (req, res) => {
  try {
    let chef = await Chef.find({});

    if (chef) {
      return res.json({ success: true, data: chef });
    } else {
      return res.json({ success: true, data: [] });
    }
  } catch (e) {
    console.log(e);
    return res.json({ success: false, data: [] });
  }
};

// query to add chef ==>not currently used
const setChefs = async (req, res) => {
  try {
    let chef = await Chef.find({});

    if (chef) {
      return res.json({ success: true, data: chef });
    } else {
      return res.json({ success: true, data: [] });
    }
  } catch (e) {
    console.log(e);
    return res.json({ success: false, data: [] });
  }
};

// query to save booked class data
const bookClass = async (req, res) => {
  try {
    let requestData = req.body.data;

    // initialising object to store in db
    let bookingInfo = {
      class_id: requestData.class_id,
      customer_email: requestData.customer_email,
      customer_first_name: requestData.customer_first_name,
      customer_last_name: requestData.customer_last_name,
      company_name: requestData.company_name,
      booking_size: requestData.booking_size,
      zoom_link: requestData.chef_zoom_link,
      chef_email: requestData.chef_email,
      booking_datetime: moment
        .tz(
          requestData.booking_datetime,
          "dddd, MMMM D,YYYY,hh:mm a",
          "US/Eastern"
        )
        .utc(),
      cost: requestData.cost,
      chef_id: requestData.chef_id,
      booking_status: "progress",
    };

    // checks if the date selected is already booked at concurrent time
    let isBooked = await Schedule.find({
      class_id: ObjectId(bookingInfo.class_id),
      $and: [
        {
          date: { $gte: new Date(bookingInfo.booking_datetime) },
        },
        {
          date: {
            $lt: new Date(moment(bookingInfo.booking_datetime).add(1, "hour")),
          },
        },
      ],
    });

    if (isBooked[0].available == false) {
      return res.status(200).send({
        error: true,
        data:
          requestData.booking_datetime +
          " time slot is unavailable , please select a different slot",
      });
    }

    // if not booked , book the slot
    let BookSlot = await Schedule.updateOne(
      {
        class_id: ObjectId(bookingInfo.class_id),
        $and: [
          {
            date: { $gte: new Date(bookingInfo.booking_datetime) },
          },
          {
            date: {
              $lt: new Date(
                moment(bookingInfo.booking_datetime).add(1, "hour")
              ),
            },
          },
        ],
      },
      { available: false }
    );

    // insert booking details
    let bookedClass = new Booking(bookingInfo);
    return bookedClass
      .save()
      .then((bookedClass) => {
        return res.status(200).json({ error: false, data: bookedClass._id });
      })
      .catch(async (err) => {
        let BookSlot = await Schedule.updateOne(
          {
            class_id: ObjectId(bookingInfo.class_id),
            $and: [
              {
                date: { $gte: new Date(bookingInfo.booking_datetime) },
              },
              {
                date: {
                  $lt: new Date(
                    moment(bookingInfo.booking_datetime).add(1, "hour")
                  ),
                },
              },
            ],
          },
          { available: true }
        );
        return res.status(200).send({
          error: true,
          data: "Class Booking Failed , please try again",
        });
      });
  } catch (e) {
    return res.status(200).send({ error: true, data: "Class Booking Failed" });
  }
};

// query to add a new time slot for a class
const addSchedule = async (req, res) => {
  let requestData = req.body.data;
  let schedule = new Schedule(requestData);
  return schedule
    .save()
    .then((schedule) => {
      return res.status(200).json({ error: false, data: schedule._id });
    })
    .catch((err) => {
      return res
        .status(200)
        .send({ error: true, data: "schedule Booking Failed" });
    });
};

// query to get timings of a class
const getSchedule = async (req, res) => {
  let class_id = req.params.class_id;
  let schedule = await Schedule.find(
    { class_id: class_id, available: true },
    { _id: 0, class_id: 0, chef_id: 0, available: 0, __v: 0 }
  );
  return res.json({ error: false, data: schedule });
};

// api which will be requested by moneris after transaction
const processPayment = async (req, res) => {
  try {
    let order_id = req.body.response_order_id;
    let response_code = req.body.response_code;
    let is_cancelled = req.body.is_cancelled;
    let transaction_details = {
      bank_transaction_id: req.body.bank_transaction_id,
      bank_approval_code: req.body.bank_approval_code,
      cardholder: req.body.cardholder,
      response_code: response_code,
      response_message: req.body.message,
      booking_status: "",
      lastUpdatedTimeStamp: new Date(),
    };

    let orderDetails = await Booking.find({ _id: order_id });
    if (is_cancelled) {
      await updateSlot(
        orderDetails[0].class_id,
        orderDetails[0].booking_datetime,
        true
      );
      await updateBookingStatus(order_id, {
        booking_status: "cancelled",
        lastUpdatedTimeStamp: new Date(),
      });
      return res.json({ error: false });
    }
    if (Number(response_code) >= 50) {
      transaction_details.booking_status = "failed";
      await updateSlot(
        orderDetails[0].class_id,
        orderDetails[0].booking_datetime,
        true
      );
      await updateBookingStatus(order_id, transaction_details);
      return;
      // response.redirect to failure page
    } else {
      transaction_details.booking_status = "success";
      await updateBookingStatus(order_id, transaction_details);
      return;
      // return res.json({ response_code: response_code, booked_date: booked_date });
    }
  } catch (e) {
    console.log(e);
    return res.redirect("https://www.feasthero.com/");
  }
};

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

const updateBookingStatus = async (order_id, status) => {
  let updatedStatus = await Booking.updateOne(
    {
      _id: ObjectId(order_id),
    },
    status
  );

  return;
};

module.exports = {
  getClasses,
  setClass,
  getChefs,
  bookClass,
  addSchedule,
  getSchedule,
  processPayment,
};
