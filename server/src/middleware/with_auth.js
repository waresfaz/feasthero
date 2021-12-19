const { StatusCodes } = require("http-status-codes");

function withAuth(req, res, next) {
    if (!req.session.account)
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'unauthorized' });

    next();
}

module.exports = withAuth;