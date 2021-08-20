const Schedule = require('../schema/schedule');
const { StatusCodes } = require("http-status-codes");

async function addTimeSlot(req, res) {
    let requestData = req.body;
    let schedule = new Schedule(requestData);
    return schedule
        .save()
        .then((schedule) => {
            return res.status(StatusCodes.OK).json(schedule._id);
        })
        .catch((_) => {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ errors: { error: "schedule Booking Failed" } });
        });
};

module.exports = addTimeSlot;