const Class = require("../schema/class");

async function getAllClassesForDisplay() {
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
    ]);
}

module.exports = getAllClassesForDisplay;