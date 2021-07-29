const { sendEmail, genMessage } = require('../services/email');
const { StatusCodes } = require("http-status-codes");

async function contact(req, res) {
    const { name, email, subject, message } = req.body;

    const msg = genMessage(name, email, message, subject);
    if ((await sendEmail(msg)) === false)
        return res.status(StatusCodes.BAD_REQUEST).json({ response: 'error' });

    return res.status(StatusCodes.OK).json({ response: 'ok' });

}

module.exports = contact;