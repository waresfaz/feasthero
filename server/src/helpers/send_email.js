const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

async function mailSender(msg) {
    sgMail.send(msg).then(
        () => { },
        (error) => {
            console.error(error);

            if (error.response) {
                console.error(error.response.body);
            }
        }
    );
};

function getMessageTemplate() {
    return {
        to: null,
        from: process.env.SENDGRID_MAIL,
        bcc: process.env.SENDGRID_MAIL,
        subject: "Reminder - FeastHero Class Scheduled for tomorrow  ",
        html: null,
    };
}

module.exports = {mailSender, getMessageTemplate};