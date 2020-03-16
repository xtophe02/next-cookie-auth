const jwt = require('jsonwebtoken')
require('dotenv').config()
const cookie = require('cookie')

const getUserId = (req, requireAuth = true) => {
    // const header = request ? request.headers.authorization : request.connection.context.Authorization
    const {token} = cookie.parse(req.headers.cookie || '')
    console.log(token)
    if (token) {
        // const token = header.replace('Bearer ', '')
        const {user} = jwt.verify(token, process.env.JWT_SECRET)
        return user
    }

    if (requireAuth) {
        throw new Error('Authentication required')
    } 
    
    return null
}

module.exports = getUserId