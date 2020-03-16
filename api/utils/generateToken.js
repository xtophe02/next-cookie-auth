const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateToken = (user) => {
    
    return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '2 hours' })
}

module.exports = generateToken