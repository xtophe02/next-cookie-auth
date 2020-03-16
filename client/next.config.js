require('dotenv').config()
module.exports = {
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    API_URI_DOCKER: process.env.API_URI_DOCKER,
    API_URI: process.env.API_URI,
  },
}