const Class = require("../schema/class");

async function getAllClasses() {
    return await Class.aggregate([
        {
            $project: {
                _id: 1,
                title: 1,
                cost: 1,
                thumbnail: 1,
                description: 1,
                duration: 1,
                chefId: 1,
                hasMealkit: 1,
                mealkitPrice: 1,
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