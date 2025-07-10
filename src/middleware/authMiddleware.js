

const jwt = require('jsonwebtoken');
const User = require('../models/userSchema'); // Assuming you want to attach the user object to req
require('dotenv').config()

const JWT_SECRET = process.env.SECRET_KEY; // Use the same key as in generateToken

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verifing my token
      const decoded = jwt.verify(token, JWT_SECRET);

      
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };