const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

const Account = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    role: String,
    password: String,
    profile: ObjectId,
});

module.exports = mongoose.model("Account", Account);
