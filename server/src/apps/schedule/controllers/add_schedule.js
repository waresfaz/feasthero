const Schedule = require('../schema/schedule');
const StatusCodes = require("http-status-codes");

async function addSchedule(req, res) {
    let requestData = req.body.data;
    let schedule = new Schedule(requestData);
    return schedule
        .save()
        .then((schedule) => {
            return res.status(StatusCodes.OK).json({ response: schedule._id });
        })
        .catch((_) => {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .send({ response: "schedule Booking Failed" });
        });
};

module.exports = addSchedule;