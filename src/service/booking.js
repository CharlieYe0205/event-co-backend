const Booking = require('../model/booking');
const Event = require('../model/event');
const { calDaysDiff } = require("../utils/dateUtils");

class BookingService {
  async find(id) {
    return Booking.find(id);
  }

  async findByEventId(eventId) {
    return Booking.findByEventId(eventId);
  }

  async create(bookingData) {
    const { contact, eventId } = bookingData;

    if (!contact || contact.length === 0) {
      throw new Error('Contact should not be empty!');
    }

    const event = await Event.find(eventId);
    if (!event) {
      throw new Error('Event not existed!');
    }

    const daysAway = calDaysDiff(event.date, new Date());
    const currentBookingCount = await Booking.CountByEventId(eventId);

    if (daysAway <= 0) {
      throw new Error('Not Valid Booking!');
    }
    if (daysAway <= 10 && currentBookingCount >= event.capacity) {
      throw new Error('Fully booked!');
    }
    if (currentBookingCount >= Math.floor(event.capacity * 1.1)) {
      throw new Error('Fully booked!');
    }

    return Booking.create(bookingData);
  }

  async update(id, bookingData) {
    const booking = await Booking.find(id);
    const event = await Event.find(booking.event_id);

    const daysAway = calDaysDiff(event.date, new Date());
    if (daysAway <= 2) {
      throw new Error('Can not be changed!');
    }

    return Booking.update(id, bookingData);
  }
}

module.exports = new BookingService();