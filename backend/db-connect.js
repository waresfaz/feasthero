const mongoose = require("mongoose");
require("dotenv").config();
const connect = () =>
  mongoose.connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

const close = () => mongoose.connection.close();

module.exports = { connect, close };
