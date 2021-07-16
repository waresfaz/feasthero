const express = require('express');
const contactRouter = express.Router();
const contact = require('./controllers/contact');

contactRouter.post("/email", contact);

module.exports = contactRouter;