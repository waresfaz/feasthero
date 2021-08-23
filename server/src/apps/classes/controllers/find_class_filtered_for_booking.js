
const ClassQueryBuilder = require('../services/query_builder');

async function findClassFilteredForBooking(req, res) {
    const query = new ClassQueryBuilder().
        filterByClassId(req.params.classId).
        includeSchedule().
        onlyIncludeBookableTimeSlots().
        includeChef().
        hideImportantChefDetails().
        onlyFirstIndex();

    const class_ = await query.run();
    return res.json(class_);
};

module.exports = findClassFilteredForBooking;