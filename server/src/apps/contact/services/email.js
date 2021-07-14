const nodemailer = require('nodemailer');

async function sendEmail(msg) {
    let transporter = new TransporterSingleton();
    return transporter.transporterInstance.sendMail(msg, (error) => {
        return false;
    });
}

class TransporterSingleton {
    static transporterInstance;

    constructor() {
        if (this.transporterInstance)
            return transporterInstance;

        this.transporterInstance = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.BOOKING_EMAIL,
                pass: process.env.BOOKING_EMAIL_PASS,
            },
        });
    }
}

function genMessage(name, email, message, subject) {
    return {
        from: name,
        to: "cpstef04@gmail.com",
        subject: `${subject} - Contact Form Submission`,
        html: `
            <p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>
           `,
    };
}

module.exports = { sendEmail, genMessage }