const express = require('express')
const app = express()
const anecdoteRouter = require('./routers/anecdoteRouter')
const mongoose = require('mongoose');
const config = require('./utils/config')
const cors = require('cors')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Error connecting to MongoDB', error.message);
  });

app.use(cors())
app.use(express.json())

app.use('/api/anecdotes', anecdoteRouter)

module.exports = app