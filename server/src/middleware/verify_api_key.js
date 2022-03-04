const { StatusCodes } = require("http-status-codes");

function verifyApiKey(req, res, next) {
    if (!apiKeyValid(req.headers.authorization))
        return res.status(StatusCodes.UNAUTHORIZED).json({ errors: { error: 'invalid api token' } });
    next();
}

function apiKeyValid(key) {
    return key === process.env.FEASTHERO_API_TOKEN;
}

module.exports = verifyApiKey;