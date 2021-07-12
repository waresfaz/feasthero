const { sendEmail, genMessageTemplate } = require('../services/email');

async function contact(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    msgTemplate = genMessageTemplate(name, email, message);
    let status = await sendEmail(msgTemplate) ? 'Message Sent' : 'ERROR';
    res.json({ status: status })
}

module.exports = contact;