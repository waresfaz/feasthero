const AuthenticationFactory = require("../services/authentication_factory");

async function login(req, res) {
    const loginData = req.body.loginData;
    const login = AuthenticationFactory.getAuthenticationService("LOGIN", loginData);
    await login.run();   
}

module.exports = login;