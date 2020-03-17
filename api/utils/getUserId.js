const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");

const getUserId = (req, requireAuth = true) => {
  // const header = request ? request.headers.authorization : request.connection.context.Authorization
  const { token } = cookie.parse(req.headers.cookie || "");

  if (token) {
    try {
      const { user } = jwt.verify(token, process.env.JWT_SECRET);
      return user;
    } catch (error) {
      throw new Error("Authentication token is invalid, please log in");
    }
  }

  if (requireAuth) {
    throw new Error("Authentication required");
  }

  return null;
};

module.exports = getUserId;
