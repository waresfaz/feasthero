const { StatusCodes } = require("http-status-codes");

function verifyApiTkn(req, res, next) {
    if (!apiTokenValid(req.headers.authorization))
        return res.status(StatusCodes.UNAUTHORIZED).json({ response: 'invalid api token' });
    next();
}

function apiTokenValid(tkn) {
    return tkn === process.env.FEASTHERO_API_TOKEN;
}

module.exports = verifyApiTkn;