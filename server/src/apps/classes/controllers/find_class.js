const findSingleClass = require('../services/find_class');

async function findClass(req, res) {
    const class_ = await findSingleClass(req.params.classId);
    return res.json(class_);
};

module.exports = findClass;