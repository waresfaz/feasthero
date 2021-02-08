import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
// import db from './db'

// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const cors = require("cors");

// import postRoutes from './routes.posts.js';
// app.use('/posts', postRoutes)

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// in real apps we need to make our credentials secure. 
// before pushing this to deplyment we will create environmental vars and store the CONNECTION_URL variable in there
const CONNECTION_URL = 'mongodb+srv://wares:wares123@cluster0.knaiq.mongodb.net/culster0?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));

  mongoose.set('useFindAndModify', false);



// ROUTES 

  app.get('/', (req, res) => {
    res.send({ message: 'This still works!'})
  });