const getAllClassesForPreviewDisplay = require('../services/all_classes_for_preview_display');
const { StatusCodes } = require("http-status-codes");

async function allClasses(_, res) {
    let classes = await getAllClassesForPreviewDisplay()
        .then((response) => response)
        .catch((error) => ({ error: error }));

    if (classes.error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: classes.error });

    return res.status(StatusCodes.OK).json(classes);

};

module.exports = allClasses;