const getAllClasses = require('../services/all_classes');

async function allClasses(_, res) {
    try {
        let classes = getAllClasses();
        return res.json({ success: true, data: classes });
    } catch (e) {
        console.log(e);
        return res.json({ success: false, data: [] });
    }
};

module.exports = allClasses;