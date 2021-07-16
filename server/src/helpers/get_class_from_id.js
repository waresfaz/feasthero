const Class = require("../apps/classes/schema/class");
const ObjectId = require("mongoose").Types.ObjectId;


async function getClassDetailsFromId(classId) {
    let classes = await Class.aggregate([
        {
            $match: { _id: ObjectId(classId) },
        },
        {
            $limit: 1,
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
    return classes[0];
}

module.exports = getClassDetailsFromId;