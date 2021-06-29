const express = require('express');
const contactRouter = express.Router();
const contact = require('./controllers/contact');

contactRouter.post("/", contact);

module.exports = contactRouter;