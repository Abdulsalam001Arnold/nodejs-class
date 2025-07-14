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


// Basic route for testing
app.get('/', (req, res) => {
  res.send('Welcome to our hosted API guys!!');
});

// Route handlers
app.use('/api', contactRoute); // Assuming contactRoute handles /api/contacts etc.
app.use('/api', userRoute);    // Assuming userRoute handles /api/users etc.
// You might want to be more specific, e.g., app.use('/api/contacts', contactRoute)
// and app.use('/api/users', userRoute) if they handle their own base paths.


// This is the crucial change for Vercel:
// Only listen on a port if not in a serverless environment (e.g., local development)
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') { // Or check if process.env.VERCEL is undefined
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

// Export the app instance for Vercel (and other environments)
module.exports = app;