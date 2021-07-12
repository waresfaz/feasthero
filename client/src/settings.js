let settings = {
    DEBUG: false,
    ORIGIN: '',
    STRIPE_PUBLISHABLE_KEY: '',
    STRIPE_SECRET_KEY: '',
};

function initSettings() {
    require('dotenv').config()

    settings = {
        ...settings,
        DEBUG: process.env.REACT_APP_DEBUG
    };

    if (settings.ORIGIN)
        return;

    if (settings.DEBUG) {
        settings = {
            ...settings,
            ORIGIN: 'http://localhost:3001',
            STRIPE_PUBLISHABLE_KEY: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST,
            STRIPE_SECRET_KEY: process.env.REACT_APP_STRIPE_SECRET_KEY_TEST
        };
    } else {
        settings = {
            ...settings,
            ORIGIN: 'https://feasthero.herokuapp.com',
            STRIPE_PUBLISHABLE_KEY: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
            STRIPE_SECRET_KEY: process.env.REACT_APP_STRIPE_SECRET_KEY,
        };
    }

    return Object.freeze(settings);
}

export { initSettings, settings };