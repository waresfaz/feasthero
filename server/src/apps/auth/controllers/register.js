const AuthenticationFactory = require("../services/authentication_factory");

async function register(req, res) {
    const regData = req.body.regData;
    const register = AuthenticationFactory.getAuthenticationService("REGISTER", regData);
    await register.run();
}

module.exports = register();