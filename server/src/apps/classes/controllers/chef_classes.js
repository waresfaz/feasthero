const { StatusCodes } = require('http-status-codes');
const ClassQueryBuilder = require('../services/query_builder');

async function chefClasses(req, res) {
    const query = new ClassQueryBuilder().filterByChefId(req.session.account._id).includeSchedule().sortSchedule();
    const classes = await query.run();
    return res.status(StatusCodes.OK).json(classes);
}

module.exports = chefClasses;