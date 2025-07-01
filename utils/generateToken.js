

const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (userId) => {
    try{
        if(!userId) {
            throw new Error('User ID is required')
        }

        const token = jwt.sign({ id: userId}, process.env.SECRET_KEY, {
            expiresIn: '20m'
        })
        return token;
    }catch(err){
        console.error(`Error generating token: ${err.message}`);
    }
}

module.exports = generateToken;