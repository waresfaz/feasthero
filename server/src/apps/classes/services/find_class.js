const Class = require("../schema/class");
const mongoose = require("mongoose");
const Types = mongoose.Types;

let ObjectId = Types.ObjectId;

async function findSingleClass(id) {
    return await Class.aggregate([
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
    ]);
}

module.exports = findSingleClass;