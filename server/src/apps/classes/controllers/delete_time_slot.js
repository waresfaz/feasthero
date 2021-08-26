const Class = require("../schemas/class");

async function deleteTimeSlot(req, res) {
    await Class.updateOne(
        { _id: req.params.classId },
        {
            $pull:
            {
                'schedule': { '_id': req.params.timeSlotId }
            }
        }
    );
}

module.exports = deleteTimeSlot;