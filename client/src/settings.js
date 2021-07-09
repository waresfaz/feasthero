let settings = {
    DEBUG: true,
    ORIGIN: ''
};

function initSettings() {
    if (settings.ORIGIN)
        return;

    if (settings.DEBUG) {
        settings = {
            ...settings,
            ORIGIN: 'http://localhost:3001',
        };
    } else {
        settings = {
            ...settings,
            ORIGIN: 'https://feasthero.herokuapp.com',
        };
    }
    return Object.freeze(settings);
}

export { initSettings, settings };