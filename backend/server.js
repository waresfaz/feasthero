const express = require("express");
const apiHandler = require("./api-handler/api-function");
const api = express();
api.use(express.json());
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
api.listen(process.env.PORT || 3001, () =>
  console.log("Server is running on 3001")
);
