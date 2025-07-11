const express = require('express');
const app = express();
const contactRoute = require('./routes/contactRoutes');
const userRoute = require('./routes/userRoute');
const mongoose = require('mongoose');
const cors = require('cors'); // Make sure cors is installed: npm install cors
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database connected successfully!!');
  })
  .catch((err) => {
    console.error(`An error occurred connecting to database: ${err.message}`);
    // It's good practice to exit the process if DB connection fails on startup
    // process.exit(1); 
  });

// Middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Use the cors middleware correctly
app.use(cors()); // Call cors() to get the middleware function

// Your custom CORS headers (optional if cors() is sufficient, but can be kept if needed for specific reasons)
// Note: app.use(cors()) typically handles these for you.
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization" // Added Authorization header
  );
  next();
});



app.get('/', (req, res) => {
  res.send('Welcome to our hosted API guys!!');
});

// Route handlers
app.use('/api', contactRoute); 




const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}


module.exports = app;