// updates the date-time slot  in schedules collection to available = true/ false
const updateSlot = async (class_id, date, value) => {
    await Schedule.updateOne(
        {
            class_id: ObjectId(class_id),
            $and: [
                {
                    date: { $gte: new Date(date) },
                },
                {
                    date: {
                        $lt: new Date(moment(date).add(1, "hour")),
                    },
                },
            ],
        },
        { available: value }
    );
    return;
};

module.exports = updateSlot;