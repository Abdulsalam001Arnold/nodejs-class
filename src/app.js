const express = require('express')
const app = express()
const contactRoute = require('./routes/contactRoutes')
const userRoute = require('./routes/userRoute')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()


mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Database connected successfully!!')
}).catch((err) => {
  console.error(`An error occurred: ${err.message}`)
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors)
app.get('/', (req, res) => {
  res.send('Welcome to our hosted API guys!!')
})
app.use('/api',contactRoute, userRoute)
app.listen(5000, () => {
    console.log('Server is running on port 5000')
})
module.exports = app