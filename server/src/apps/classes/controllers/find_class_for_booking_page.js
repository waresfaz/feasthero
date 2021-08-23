const ClassQueryBuilder = require('../services/query_builder');

async function findClassFilteredForBookingPage(req, res) {
    const query = new ClassQueryBuilder().
        filterByClassId(req.params.classId).
        includeSchedule().
        onlyIncludeBookableTimeSlots().
        includeChef().hideImportantChefDetails().
        onlyFirstIndex();

    const class_ = await query.run();
    return res.json(class_);
};

module.exports = findClassFilteredForBookingPage;