async function sendEmail(msgTemplate) {
    let transporter = new TransporterSingleton();
    transporter.transporterInstance.sendMail(msgTemplate, (error) => {
        if (error) {
            console.log("Mail sending error", error);
            return false;
        } else {
            console.log("Mail successfully sent:");
            return true;
        }
    });
}

class TransporterSingleton {
    static transporterInstance;

    constructor() {
        if (transporterInstance)
            return transporterInstance;

        this.transporterInstance = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "bookings@feasthero.com",
                pass: "udpocujnumjmtzyf",
            },
        });
    }
}

function genMessageTemplate(name, email, message) {
    return {
        from: name,
        to: "bookings@feasthero.com",
        subject: "Contact Form Submission",
        html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
    };
}

module.exports = { sendEmail, genMessageTemplate }