/**
 * @description updates the date-time slot in schedules collection to available
 * @param {String} classId - slot for this class
 * @param {Date} date - date of the slot
 * @param {Boolean} available - if the slot is avaliable 
 */
async function updateSlot(classId, dateTime, { available }) {
    await Schedule.updateOne(
        {
            classId: ObjectId(classId),
            dateTime: dateTime
        },
        { available: available }
    );
};

module.exports = updateSlot;