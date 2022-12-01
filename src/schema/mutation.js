const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLBoolean } = require("graphql");
const BookingType = require("./bookingSchema");
const BookingService = require("../service/booking");

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createBooking: {
      type: BookingType,
      args: {
        contact: { type: new GraphQLNonNull(GraphQLString) },
        eventId: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parentValue, { contact, eventId }) {
        return await BookingService.create({ contact, eventId })
      },
    },
    updateBooking: {
      type: BookingType,
      args: {
        id: { type: GraphQLString },
        active: { type: GraphQLBoolean },
      },
      async resolve(parentValue, { id, active }) {
        return await BookingService.update(id, { active })
      },
    },
  },
});

module.exports = mutation;