function contact(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const mail = {
        from: name,
        to: "bookings@feasthero.com",
        subject: "Contact Form Submission",
        html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json({ status: "ERROR" });
            console.log("Mail sending error", error);
        } else {
            res.json({ status: "Message Sent" });
            console.log("Mail successfully sent:");
        }
    });
}

module.exports = contact;