const Class = require("../schema/class");
const moment = require('moment-timezone');

async function getAllClasses() {
    const WEEK_FROM = moment
        .utc(new Date().toISOString())
        .tz('US/Eastern')
        .add(7, 'd')
        .toDate();

    const WEEK_TO = moment
        .utc(new Date().toISOString())
        .tz('US/Eastern')
        .add(12, 'w')
        .toDate();

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
                from: "schedules",
                as: "schedule",
                let: { id: "$_id" },
                pipeline: [
                    {
                        $match: {
                            "dateTime": { "$gte": WEEK_FROM, "$lte": WEEK_TO },
                            $expr: {
                                $and: [
                                    { $eq: ['$available', true] },
                                    { $eq: ['$classId', '$$id'] },
                                ]
                            }
                        }
                    },
                    {
                        $sort: {
                            dateTime: 1
                        },
                    },
                ],
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
    ]);
}

module.exports = getAllClasses;