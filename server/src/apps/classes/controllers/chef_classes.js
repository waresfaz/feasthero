const { StatusCodes } = require('http-status-codes');
const ClassQueryBuilder = require('../services/class_query_builder');

async function chefClasses(req, res) {
    const query = new ClassQueryBuilder().filterByChefId(req.session.account._id).sortSchedule();
    const classes = await query.run();
    return res.status(StatusCodes.OK).json(classes);
}

module.exports = chefClasses;