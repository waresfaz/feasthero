let settings = {
    DEBUG: true,
    ORIGIN: '',
};

function initSettings() {
    settings.PORT = normalizePort(process.env.PORT || '8080');

    if (settings.DEBUG) {
        settings.ORIGIN = 'http://localhost:' + settings.PORT;
    } else {
        settings.ORIGIN = 'https://wwww.feasthero.com';
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