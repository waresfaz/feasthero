async function new_class(_, res) {
    let clasData = new Class(req.body);
    return clasData
        .save()
        .then((clasData) => {
            return res.status(200).json({ error: false, data: clasData._id });
        })
        .catch(async (_) => {
            return res.status(200).send({
                error: true,
                data: "Class insert Failed , please try again",
            });
        });
};

module.exports = new_class;