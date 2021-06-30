const Chef = require('../schema/chef');

// query to add chef ==>not currently used
async function newChef(req, res) {
    let chefData = new Chef(req.body);
    return chefData
        .save()
        .then((chefData) => {
            return res.status(200).json({ error: false, data: chefData._id });
        })
        .catch(async (_) => {
            return res.status(200).send({
                error: true,
                data: "chef data insert Failed , please try again",
            });
        });
};
module.exports = newChef;