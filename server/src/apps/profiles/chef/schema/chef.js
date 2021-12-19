const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Chef = new Schema({
    _id: false,
    id: false
});

module.exports = mongoose.model("ChefProfile", Chef);
