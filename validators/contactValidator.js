
const Joi = require('joi');

const contactValidator = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().optional().min(10).max(15)
})

module.exports = contactValidator;