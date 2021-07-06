const getAllClasses = require('../services/all_classes');

async function allClasses(_, res) {
    try {
        let classes = await getAllClasses();
        return res.json({ response: classes });
    } catch (e) {
        console.log(e);
        return res.json({ response: [] });
    }
};

module.exports = allClasses;