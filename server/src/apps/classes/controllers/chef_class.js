const { StatusCodes } = require('http-status-codes');
const ClassQueryBuilder = require('../services/class_query_builder');

async function chefClass(req, res) {
    const query = new ClassQueryBuilder().filterByClassId(req.params.classId).sortSchedule().onlyFirstIndex();
    const classes = await query.run();
    console.log(classes)
    return res.status(StatusCodes.OK).json(classes);
}

module.exports = chefClass;