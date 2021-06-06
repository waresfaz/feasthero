const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const apiHandler = require("./api-handler/api-function");
const api = express();
const router = express.Router();
api.use(cors())
api.use(express.json());
api.use("/", router);
api.use(express.urlencoded({ extended: true }));

api.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type , Authorization");
  res.setHeader(
    "Access-Control-Request-Headers",
    "Content-Type ,Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
api.get("/classes", async (req, res) => await apiHandler.getClasses(req, res));
api.post("/class", async (req, res) => await apiHandler.setClass(req, res));
api.get("/chefs", async (req, res) => await apiHandler.getChefs(req, res));
api.post("/chefs", async (req, res) => await apiHandler.setChefs(req, res));
api.post("/booking", async (req, res) => await apiHandler.bookClass(req, res));
api.get(
  "/schedule/:class_id",
  async (req, res) => await apiHandler.getSchedule(req, res)
);
api.post(
  "/schedule",
  async (req, res) => await apiHandler.addSchedule(req, res)
);
api.post(
  "/payment",
  async (req, res) => await apiHandler.processPayment(req, res)
);
api.get(
  "/order/:order_id",
  async (req, res) => await apiHandler.getOrderDetails(req, res)
);

// #Start Contact Us page set up 
const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "bookings@feasthero.com",
    pass: "udpocujnumjmtzyf",
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message; 
  const mail = {
    from: name,
    to: "bookings@feasthero.com",
    subject: "Contact Form Submission",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});

// #End Contact Us page set up 

api.listen(process.env.PORT || 3001, () =>
  console.log("Server is running on 3001")
);
