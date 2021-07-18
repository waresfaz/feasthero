let settings = {
    DEBUG: false,
    ORIGIN: '',
    STRIPE_PUBLISHABLE_KEY: '',
    STRIPE_SECRET_KEY: '',
    RECAPTCHA_SECRET_KEY: '',
    RECAPTCHA_SITE_KEY: '',
};

function initSettings() {
    require('dotenv').config()
    let debug;
    if (process.env.REACT_APP_DEBUG === 'true')
        debug = true;
    else 
        debug = false;

    settings = {
        ...settings,
        DEBUG: debug
    }
    console.log(settings.DEBUG)

    if (settings.DEBUG) {
        settings = {
            ...settings,
            ORIGIN: 'http://localhost:3002',
            STRIPE_PUBLISHABLE_KEY: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST,
            STRIPE_SECRET_KEY: process.env.REACT_APP_STRIPE_SECRET_KEY_TEST,
            RECAPTCHA_SITE_KEY: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
            RECAPTCHA_SECRET_KEY: 'vFI1TnRWxMZNFuojJ4WifJWe',
        };
    } else {
        settings = {
            ...settings,
            ORIGIN: 'https://feasthero.herokuapp.com',
            STRIPE_PUBLISHABLE_KEY: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
            STRIPE_SECRET_KEY: process.env.REACT_APP_STRIPE_SECRET_KEY,
            RECAPTCHA_SITE_KEY: process.env.REACT_APP_RECAPTCHA_SITE_KEY,
            RECAPTCHA_SECRET_KEY: process.env.REACT_APP_RECAPTCHA_SECRET_KEY,
        };
    }

    return Object.freeze(settings);
}

export { initSettings, settings };