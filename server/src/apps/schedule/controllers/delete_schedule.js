const { StatusCodes } = require("http-status-codes");
const Schedule = require("../schema/schedule");

async function deleteSchedule(req, res) {
    const { scheduleId } = req.params;

    return await Schedule.findByIdAndDelete(scheduleId, null, function (err, doc) {
        if (!doc.acknowledged && doc.deletedCount !== 1)
            return res.status(StatusCodes.BAD_REQUEST).json({ errors: { error: 'schedule does not exist' } });
        if (err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { error: err } });
        if (!err)
            return res.status(StatusCodes.OK).json('ok');
    })
}

module.exports = deleteSchedule;