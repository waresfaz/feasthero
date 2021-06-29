let settings = {
    DEBUG: true,
    MONERIS: {
        URL: '',
        PS_STORE_ID: '',
        HPP_KEY: '',
    },
};

function initSettings() {
    if (settings.DEBUG) {
        settings.MONERIS = {
            URL: "https://esqa.moneris.com/HPPDP/index.php",
            PS_STORE_ID: "CVQNQtore1",
            HPP_KEY: "hpB9RYVYPULN",
        };
    } else {
        settings.MONERIS = {
            URL: "https://www3.moneris.com/HPPDP/index.php",
            PS_STORE_ID: "GT3RZ41539",
            HPP_KEY: "hpEOUYV1I652",
        };
    }

    return Object.freeze(settings);
}

export { initSettings, settings };