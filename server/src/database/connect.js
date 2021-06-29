const mongoose = require("mongoose");

function connectToDb() {
  console.log(process.env.MONGO_URI)
  mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const connection = mongoose.connection;
  connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
  });
}

function close() {
  mongoose.connection.close();
}

module.exports = { connectToDb, close };
