const hashPassword = require("../utils/hashPassword");
const generateToken = require("../utils/generateToken");
const getUserId = require("../utils/getUserId");
const bcrypt = require("bcryptjs");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const resolvers = {
  Query: {
    hello: () => "hello world",
    viewer: async (parent, args, { req }, info) => {
      try {
        const user = await getUserId(req);

      return { id: user._id, email: user.email };
      } catch (error) {
        console.log(error)
      }
      return null

      // const { token } = cookie.parse(req.headers.cookie || "");

      // if (token) {
      //   try {

      //     const { user } = jwt.verify(token, process.env.JWT_SECRET);

      //     return { id: user._id, email: user.email };
      //   } catch {
      //     throw new AuthenticationError(
      //       "Authentication token is invalid, please log in"
      //     );
      //   }
      // }
    }
  },
  Mutation: {
    signIn: async (parent, { input }, { UserModel, res }, info) => {
      const { email, password } = input;
      const user = await UserModel.findOne({ email });

      if (!user) {
        throw new Error("Unable to login");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error("Unable to login");
      }

      const token = generateToken(user);

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          maxAge: 2 * 60 * 60,
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production"
        })
      );
      return user;
    },
    signUp: async (parent, { input }, { UserModel }, info) => {
      const { email, password } = input;

      // console.log(password)
      const user = await UserModel.findOne({ email });

      if (user) {
        throw new Error("Email in use");
      }
      const hashedPassword = await hashPassword(password);

      const newUser = new UserModel({ email, password: hashedPassword });

      try {
        const result = await newUser.save();

        return result;
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};

module.exports = { resolvers };
