const { StatusCodes } = require("http-status-codes");
const Class = require("../schema/class");

async function deleteClass(req, res) {
    const classId = req.params.id;

    return await Class.deleteOne({ _id: '60e605568b5bf50ff849c66b' }, function (err, doc) {
        if (!doc.acknowledged && doc.deletedCount !== 1)
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'class does not exist' });
        if (err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err });
        if (!err)
            return res.status(StatusCodes.OK).json('ok');

    });
}

module.exports = deleteClass;