const Class = require("../schema/class");
const mongoose = require("mongoose");
const Types = mongoose.Types;

let ObjectId = Types.ObjectId;

async function findClass(id) {
    return (await Class.aggregate([
        {
            $match: {
                _id: new ObjectId(id),
            },
        },
        {
            $limit: 1
        },
        {
            $lookup: {
                from: "chefs",
                localField: "chefId",
                foreignField: "_id",
                as: "chefs",
            },
        },
        {
            $lookup: {
                from: "schedules",
                localField: "_id",
                foreignField: "classId",
                as: "schedule",
            },
        },
    ]))[0];
}

module.exports = findClass;