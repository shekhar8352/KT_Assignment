require('dotenv').config()
const express = require('express');
const cors = require('cors');
const connectDB  = require('./db/index.js');
const app = express()

console.log("Connecting to DB");
connectDB()

app.use(express.json({extended:false}))
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// ROUTES
app.use('/api/user',require('./routes/api/user'));

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`)
})