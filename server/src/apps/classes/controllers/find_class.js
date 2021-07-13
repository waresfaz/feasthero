const Class = require('../schema/class');
const findSingleClass = require('../services/find_class');

async function findClass(req, res) {
    let class_ = (await findSingleClass(req.params.id))[0];
    return res.json({ response: class_ });
};

module.exports = findClass;