const Class = require("../apps/classes/schema/class");


async function getClassDetailsFromId(classId) {
    let classes = await Class.aggregate([
        {
            $match: { _id: classId },
        },
        {
            $project: {
                title: 1,
                cost: 1,
                duration: 1,
                chefId: 1,
                description: 1,
                recipe: 1,
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
    return classes[0];
}

module.exports = getClassDetailsFromId;