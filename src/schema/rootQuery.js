const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const EventType = require("./eventSchema");
const EventService = require("../service/event");
const BookingType = require("./bookingSchema");
const BookingService = require("../service/booking");

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    event: {
      type: EventType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        return await EventService.find(args.id);
      }
    },
    events: {
      type: new GraphQLList(EventType),
      async resolve(parentValue, args) {
        return await EventService.index();
      }
    },
    booking: {
      type: BookingType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        return await BookingService.find(args.id);
      },
    },
  },
});

module.exports = RootQuery;