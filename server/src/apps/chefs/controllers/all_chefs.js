const Chef = require('../schema/chef');

async function allChefs(_, res) {
    try {
        let chef = await Chef.find({});
        return res.json({ success: true, data: chef });
    } catch (e) {
        console.log(e);
        return res.json({ success: false, data: [] });
    }
};

module.exports = allChefs;