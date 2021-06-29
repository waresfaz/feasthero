const Class = require("../schema/class");

async function get_all_classes() {
    return await Class.aggregate([
        {
            $project: {
                _id: 1,
                title: 1,
                cost: 1,
                thumbnail: 1,
                description: 1,
                duration: 1,
                chef_id: 1,
                has_mealkit: 1,
                mealkit_price: 1,
            },
        },
        {
            $lookup: {
                from: "chefs",
                localField: "chef_id",
                foreignField: "_id",
                as: "chefs",
            },
        },
    ]);
}

module.exports = get_all_classes;