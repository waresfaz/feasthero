const findSingleClassFilteredForDisplay = require('../services/find_class_filtered_for_display');

async function findClassFilteredForDisplay(req, res) {
    const class_ = await findSingleClassFilteredForDisplay(req.params.classId);
    console.log(class_)
    return res.json(class_);
};

module.exports = findClassFilteredForDisplay;