const { StatusCodes } = require("http-status-codes");
const Class = require("../apps/classes/schema/class");

async function verifyChefIsAccessingTheirClass(req, res, next) {
    const account = req.session.account;
    const classId = req.params.classId;

    const classes = await getAllClassesForAChef(account._id);

    for (let i = 0; i < classes.length; i++) {
        if (classes[i]._id.toString() === classId) {
            next();
            return;
        }
    }
    res.status(StatusCodes.UNAUTHORIZED).json({ errors: { error: 'unauthorized' } });
}

async function getAllClassesForAChef(chefId) {
    return await Class.find({ chefId: chefId });
}

module.exports = verifyChefIsAccessingTheirClass;