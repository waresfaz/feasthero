const get_all_classes = require('../services/all_classes');

async function all_classes(_, res) {
    try {
        let classes = get_all_classes();
        return res.json({ success: true, data: classes });
    } catch (e) {
        console.log(e);
        return res.json({ success: false, data: [] });
    }
};

module.exports = all_classes;