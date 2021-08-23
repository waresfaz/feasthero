const findSingleClass = require('../services/find_class_filtered_for_display');

async function findClass(req, res) {
    const class_ = await findSingleClass(req.params.classId);
    console.log(class_)
    return res.json(class_);
};

module.exports = findClass;