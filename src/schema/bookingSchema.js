const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql");

const BookingType = new GraphQLObjectType({
  name: 'Booking',
  fields: {
    id: { type: GraphQLString },
    event_id: { type: GraphQLString },
    contact: { type: GraphQLString },
    active: { type: GraphQLBoolean },
  },
});

module.exports = BookingType;