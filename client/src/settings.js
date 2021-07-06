let settings = {
    DEBUG: true,
    MONERIS: {
        URL: '',
        PS_STORE_ID: '',
        HPP_KEY: '',
    },
    ORIGIN: ''
};

function initSettings() {
    if (settings.ORIGIN)
        return;

    if (settings.DEBUG) {
        settings = {
            ...settings,
            ORIGIN: 'http://localhost:3001',
            MONERIS: {
                URL: "https://esqa.moneris.com/HPPDP/index.php",
                PS_STORE_ID: "CVQNQtore1",
                HPP_KEY: "hpB9RYVYPULN",
            }
        };
    } else {
        settings = {
            ...settings,
            ORIGIN: 'https://feasthero.herokuapp.com',
            MONERIS: {
                URL: "https://www3.moneris.com/HPPDP/index.php",
                PS_STORE_ID: "GT3RZ41539",
                HPP_KEY: "hpEOUYV1I652",
            }
        };
    }
    return Object.freeze(settings);
}

export { initSettings, settings };