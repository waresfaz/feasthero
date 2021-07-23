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