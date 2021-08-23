const getAllClassesFilteredForDisplay = require('../services/all_classes_filtered_for_display');
const { StatusCodes } = require("http-status-codes");

async function allClassesFilteredForDisplay(_, res) {
    let classes = await getAllClassesFilteredForDisplay()
        .then((response) => response)
        .catch((error) => ({ error: error }));

    if (classes.error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: classes.error });

    return res.status(StatusCodes.OK).json(classes);

};

module.exports = allClassesFilteredForDisplay;