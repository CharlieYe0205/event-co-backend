const {
  GraphQLSchema,
} = require("graphql");
const RootQuery = require("./rootQuery");
const mutation = require("./mutation");

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});