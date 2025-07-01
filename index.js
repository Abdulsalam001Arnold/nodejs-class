const express = require('express')
const app = express()
const contactRoute = require('./routes/contactRoutes')
const userRoute = require('./routes/userRoute')
const mongoose = require('mongoose')
require('dotenv').config()


mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Database connected successfully!!')
}).catch((err) => {
  console.error(`An error occurred: ${err.message}`)
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api',contactRoute, userRoute)
app.get('/info', (req, res) => {
  console.log(`Made a ${req.method} request to ${req.url} headers: ${JSON.stringify(req.headers)}`)
  res.redirect('/')
  res.send('This is the info page')
})
app.listen(5000, () => {
    console.log('Server is running on port 5000')
})
