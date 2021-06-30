const Schedule = require('../schema/schedule');

// query to get timings of a class
async function getClassSchedule(req, res) {
    try {
        let classId = req.params.class_id;
        let schedule = await Schedule.find(
            { class_id: classId, available: true },
            { _id: 0, class_id: 0, chef_id: 0, available: 0, __v: 0 }
        ).sort('date');
        return res.json({ error: false, data: schedule });
    } catch (e) {
        return res.json({ error: true, data: [] });
    }
};

module.exports = getClassSchedule;