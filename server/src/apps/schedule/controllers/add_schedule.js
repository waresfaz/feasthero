const Schedule = require('../schema/schedule');

// query to add a new time slot for a class
async function addSchedule(req, res) {
    let requestData = req.body.data;
    let schedule = new Schedule(requestData);
    return schedule
        .save()
        .then((schedule) => {
            return res.status(200).json({ error: false, data: schedule._id });
        })
        .catch((_) => {
            return res
                .status(200)
                .send({ error: true, data: "schedule Booking Failed" });
        });
};

module.exports = addSchedule;