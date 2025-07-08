

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /.+\@.+\..+/,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 15,
    },
   profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
})

userSchema.pre('save', async function (next) {
    if(!this.isModified('password'))
return next();
    

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

const User = mongoose.model('users', userSchema);

module.exports = User;

