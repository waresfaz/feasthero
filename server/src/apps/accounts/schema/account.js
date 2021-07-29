const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Account = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    type: String,
    password: String,
    profile: Schema.Types.Mixed,
});

module.exports = mongoose.model("Account", Account);
