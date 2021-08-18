const Class = require("../schema/class");
const ObjectId = require('mongoose').Types.ObjectId;

async function getAllChefsClasses(chefId) {
    return await Class.aggregate([
        {
            $project: {
                _id: 1,
                title: 1,
                costPerDevice: 1,
                thumbnail: 1,
                description: 1,
                duration: 1,
                chefId: 1,
                hasMealKit: 1,
                mealKitCost: 1,
            },
        },
        {
            $match: { chefId: ObjectId(chefId) },
        },
        {
            $lookup: {
                from: "schedules",
                localField: "_id",
                foreignField: "classId",
                as: "schedule",
            }
        },
        {
            $sort: {
                "schedule.dateTime": 1,
            },
        }
    ]);
}

module.exports = getAllChefsClasses;