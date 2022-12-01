const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require("graphql");
const BookingService = require("../service/booking");
const BookingType = require("./bookingSchema");

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    capacity: { type: GraphQLInt },
    date: { type: GraphQLString },
    bookings: {
      type: new GraphQLList(BookingType),
      async resolve(parentValue, args) {
        return await BookingService.findByEventId(parentValue.id);
      },
    },
  },
});

module.exports = EventType;