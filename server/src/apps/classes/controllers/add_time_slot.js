const TimeSlot = require('../schemas/time_slot');
const { StatusCodes } = require("http-status-codes");
const Class = require('../schemas/class');

async function addTimeSlot(req, res) {
    let classData = await Class.findOne({ _id: req.params.classId });
    console.log(classData);
    let timeSlot = new TimeSlot(req.body);
    classData.schedule.push(timeSlot);
    console.log(timeSlot)
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