const Login = require("./login");
const Registration = require("./register");

class AuthenticationFactory {
    static getAuthenticationService(type, authData) {
        switch (type) {
            case "LOGIN":
                return new Login(authData);
            case "REGISTER":
                return new Registration(authData);
            default:
                return null;
        }
    }
}

module.exports = AuthenticationFactory;