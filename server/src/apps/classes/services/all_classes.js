const Class = require("../schema/class");

async function getAllClasses() {
    // it is ok for now to retrieve schedule info in general query due to small number of classes
    // it is faster to do one large query than multiple small querys rn
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
                mealKitPrice: 1,
            },
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

module.exports = getAllClasses;