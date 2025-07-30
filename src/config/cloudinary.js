

const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
})

// console.log('The env secrets:', process.env.CLOUD_NAME, process.env.API_KEY, process.env.API_SECRET)

module.exports = cloudinary