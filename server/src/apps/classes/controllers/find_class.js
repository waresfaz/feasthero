const Class = require('../schema/class');

async function findClass(req, res) {
    let class_ = await Class.findOne({ _id: req.params.id });
    return res.json({ response: class_ });
};

module.exports = findClass;