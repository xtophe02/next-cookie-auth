const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");
const connectDb = require("./db");
const { typeDefs } = require("./graphql/type-defs");
const { resolvers } = require("./graphql/resolvers");
const UserModel = require("./models/User");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};
const app = express();
app.use(cors(corsOptions));
const context = ({res,req}) => ({ UserModel, res, req });
const server = new ApolloServer({ typeDefs, resolvers, context });
server.applyMiddleware({ app, cors: false });
// The `listen` method launches a web server.
connectDb();
app.listen(process.env.PORT, () =>
  console.log(
    `🔥🔥🔥 GraphQL + Express auth tutorial listening on port ${process.env.PORT}!`
  )
);
