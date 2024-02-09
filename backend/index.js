require('dotenv').config()
const express = require('express');
const connectDB  = require('./db/index.js');
const app = express()

console.log("Connecting to DB");
connectDB()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`)
})