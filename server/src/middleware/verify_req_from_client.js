const StatusCodes = require('http-status-codes');

function verifyReqFromClient(req, res, next) {
    if (!reqApiTokenValid(req))
        return res.status(StatusCodes.UNAUTHORIZED).json({ response: 'not from feasthero' });

    next();
}

function reqApiTokenValid(req) {
    return req.query.tkn === process.env.FEASTHERO_API_TOKEN;
}

module.exports = verifyReqFromClient;