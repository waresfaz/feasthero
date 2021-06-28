const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// #Start Contact Us page set up 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "bookings@feasthero.com",
        pass: "udpocujnumjmtzyf",
    },
});

transporter.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready to Send");
    }
});

// basic email template which is repeated.
let msg = {
    to: null,
    from: process.env.SENDGRID_MAIL,
    bcc: process.env.SENDGRID_MAIL,
    subject: null,
    html: null,
};

//sends the mail to customer upon booking confirmation
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

    msg.to = order[0].customer_email;
    msg.subject = "FeastHero Class Booking Confirmation";
    msg.html = `Hi <b>${order[0].customer_first_name
        }</b>, thanks for booking with FeastHero!.
         <p>
          Here’s everything you need to know for you class with ${classes.chefs[0].name
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
          Join with this link: <a href=${order[0].zoom_link}> ${order[0].zoom_link
        } </a> </h3>
    <br/>
          <p>
          ${classes.description}
    </p>
         <p> Remember for this class you will need ${classes.recipe.toString()}. </p>
    
        <h4>  We look forward to having you join!</h4>
         `;

    await mailSender(msg);
    await sendMailToChef(classes, order[0]);
};

// Main mail sender function of sendgrid
const mailSender = async (msg) => {
    //ES6
    sgMail.send(msg).then(
        () => { },
        (error) => {
            console.error(error);

            if (error.response) {
                console.error(error.response.body);
            }
        }
    );
};

//function to send a slot booked mail to the chef
const sendMailToChef = async (classes, order) => {
    // message template
    msg.to = classes.chefs[0].email;
    msg.subject = ` FeastHero Class ${classes.title}  Slot Booked`;
    msg.html = `Hi <b>${classes.chefs[0].name}</b>, Your class <b>${classes.title
        }</b>  has been booked  for the slot 
      <p>
      Date: <b> ${moment
            .utc(order.booking_datetime)
            .tz("US/Eastern")
            .format("dddd, MMMM D,YYYY")} </b></p>
        <p>
      Time: <b>${moment
            .utc(order.booking_datetime)
            .tz("US/Eastern")
            .format("hh:mm a")} EST </b></p> 
         `;

    await mailSender(msg);
};