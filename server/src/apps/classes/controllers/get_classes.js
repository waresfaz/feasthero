const Class = require("../../../schema/class");

// query to get the data of all classes
async function getClasses(_, res) {
    try {
        let classes = await Class.aggregate([
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
        return res.json({ success: true, data: classes });
    } catch (e) {
        console.log(e);
        return res.json({ success: false, data: [] });
    }
};

module.exports = getClasses;