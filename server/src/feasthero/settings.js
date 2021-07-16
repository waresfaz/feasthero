let settings = {
    DEBUG: false,
    ORIGIN: '',
    CLIENT_ORIGIN: '',
    SESSION_SECRET: '',
    MONGO_URI: '',
    stripe: {
        PUBLISHIBLE_KEY: '',
        SECRET_KEY: '',
    }
};

function initSettings() {
    settings.DEBUG = process.env.DEBUG;
    settings.PORT = normalizePort(process.env.PORT || '8080');
    settings.SESSION_SECRET = process.env.SESSION_SECRET;

    if (settings.DEBUG) {
        settings.ORIGIN = 'http://localhost:' + settings.PORT;
        settings.CLIENT_ORIGIN = 'http://localhost:3000';
        settings.MONGO_URI = process.env.MONGO_TEST_URI;
        settings.stripe.PUBLISHIBLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY_TEST;
        settings.stripe.SECRET_KEY = process.env.STRIPE_SECRET_KEY_TEST;
    } else {
        settings.ORIGIN = 'https://wwww.feasthero.herokuapp.com';
        settings.CLIENT_ORIGIN = 'https://www.feasthero.com';
        settings.MONGO_URI = process.env.MONGO_URI;
        settings.stripe.PUBLISHIBLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
        settings.stripe.SECRET_KEY = process.env.STRIPE_SECRET_KEY;
    }
    return Object.freeze(settings);
}

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

module.exports = { initSettings, settings };