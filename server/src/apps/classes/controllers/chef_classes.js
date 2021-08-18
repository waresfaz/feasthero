const { StatusCodes } = require('http-status-codes');
const getAllChefsClasses = require("../services/chefs_classes");

async function chefClasses(req, res) {
    const chefId = req.session.account._id;

    const classes = await getAllChefsClasses(chefId);

    return res.status(StatusCodes.OK).json(classes);
}

module.exports = chefClasses;