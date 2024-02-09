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
app.use('/api/authuser',require('./routes/api/authUser'));
app.use('/api/device',require('./routes/api/device'));
app.use('/api/room',require('./routes/api/room'));
app.use('/api/admin',require('./routes/api/admin'));
app.use('/api/authadmin',require('./routes/api/authAdmin'));


app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`)
})