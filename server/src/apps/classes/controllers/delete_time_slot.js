const { StatusCodes } = require("http-status-codes");
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

    return res.status(StatusCodes.OK).send('ok')
}

module.exports = deleteTimeSlot;