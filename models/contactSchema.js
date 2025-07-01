
const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
    },
    phoneNumber: {
        type: String,
    }
})

const Contact = mongoose.model('contacts', contactSchema)

module.exports = Contact