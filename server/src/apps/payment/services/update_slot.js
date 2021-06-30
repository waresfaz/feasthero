/**
 * @description updates the date-time slot in schedules collection to available
 * @param {String} class_id - slot for this class
 * @param {Date} date - date of the slot
 * @param {Boolean} available - if the slot is avaliable 
 */
async function updateSlot(class_id, date, { available }) {
    await Schedule.updateOne(
        {
            class_id: ObjectId(class_id),
            $and: [
                {
                    date: { $gte: date },
                },
                {
                    date: {
                        $lt: new Date(moment(date).add(1, "hour")),
                    },
                },
            ],
        },
        { available: available }
    );
};

module.exports = updateSlot;