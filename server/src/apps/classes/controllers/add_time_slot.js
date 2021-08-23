const TimeSlot = require('../schemas/time_slot');
const { StatusCodes } = require("http-status-codes");
const Class = require('../schemas/class');

async function addTimeSlot(req, res) {
    let classData = Class.findOne({ _id: req.params.classId });
    let timeSlot = new TimeSlot(req.body);
    classData.schedule.push(timeSlot);
    return classData
        .save()
        .then((classData) => {
            return res.status(StatusCodes.OK).json(classData.schedule);
        })
        .catch((_) => {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ errors: { error: "failed to add timeslot" } });
        });
};

module.exports = addTimeSlot;