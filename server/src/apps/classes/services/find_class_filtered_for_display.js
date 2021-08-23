const Class = require("../schema/class");
const mongoose = require("mongoose");
const moment = require('moment-timezone');
const Types = mongoose.Types;

let ObjectId = Types.ObjectId;

async function findClass(id) {
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
                from: "accounts",
                as: "chefs",
                let: { chefId: "$chefId" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id", "$$chefId"]
                            }
                        },
                    },
                    {
                        '$project': {
                            'profile.zoom': 0,
                            'email': 0,
                        }
                    }
                ]
            },
        },
    ]))[0];
}

module.exports = findClass;