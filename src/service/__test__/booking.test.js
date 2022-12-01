const BookingService = require('../booking');
const Booking = require('../../model/booking');
const Event = require('../../model/event');
const { dateFromDaysDiff } = require("../../utils/dateUtils");

jest.mock('../../model/booking');
jest.mock('../../model/event');

describe('when creating booking', function () {

  it('throws error if no contact is presented', async () => {
    const bookingData = { contact: '', eventId: 'eventId' };

    await expect(BookingService.create(bookingData))
      .rejects
      .toThrow('Contact should not be empty!');
  });

  it('throws error if no event found by give eventId', async () => {
    const bookingData = { contact: 'foo', eventId: 'eventId' };

    Event.find.mockResolvedValue(null);

    await expect(BookingService.create(bookingData))
      .rejects
      .toThrow('Event not existed!');
  });

  it('throws error when event is expired', async () => {
    const capacity = 100;
    const day1Ago = dateFromDaysDiff(-1);
    const event = { id: 'eventId', capacity, date: day1Ago };
    const bookingData = { contact: 'foo', eventId: 'eventId' };

    Event.find.mockResolvedValue(event);
    Booking.CountByEventId.mockResolvedValue(capacity);

    await expect(BookingService.create(bookingData))
      .rejects
      .toThrow('Not Valid Booking!');
  });

  it('throws error when there is overbooking if event date is less than 10 days', async () => {
    const capacity = 100;
    const day5FromNow = dateFromDaysDiff(5);
    const event = { id: 'eventId', capacity, date: day5FromNow };
    const bookingData = { contact: 'foo', eventId: 'eventId' };

    Event.find.mockResolvedValue(event);
    Booking.CountByEventId.mockResolvedValue(capacity);

    await expect(BookingService.create(bookingData))
      .rejects
      .toThrow('Fully booked!');
  });

  it('allows booking when there is no overbooking if event date is less than 10 days', async () => {
    const capacity = 100;
    const day5FromNow = dateFromDaysDiff(5);
    const event = { id: 'eventId', capacity, date: day5FromNow };
    const bookingData = { contact: 'foo', eventId: 'eventId' };
    const booking = { id: 'bookingId', ...bookingData };

    Event.find.mockResolvedValue(event);
    Booking.CountByEventId.mockResolvedValue(capacity - 1);
    Booking.create.mockResolvedValue(booking);

    const createdBooking = await BookingService.create(bookingData);
    expect(createdBooking).toEqual(booking);
  });

  it('throws error when there is 10% overbooking if event date is more than 10 days', async () => {
    const capacity = 100;
    const day50FromNow = dateFromDaysDiff(50);
    const event = { id: 'eventId', capacity, date: day50FromNow };
    const bookingData = { contact: 'foo', eventId: 'eventId' };

    Event.find.mockResolvedValue(event);
    Booking.CountByEventId.mockResolvedValue(capacity * 1.1);

    await expect(BookingService.create(bookingData))
      .rejects
      .toThrow('Fully booked!');
  });

  it('allows booking when there is no 10% overbooking if event date is more than 10 days', async () => {
    const capacity = 100;
    const day50FromNow = dateFromDaysDiff(50);
    const event = { id: 'eventId', capacity, date: day50FromNow };
    const bookingData = { contact: 'foo', eventId: 'eventId' };
    const booking = { id: 'bookingId', ...bookingData };

    Event.find.mockResolvedValue(event);
    Booking.CountByEventId.mockResolvedValue(capacity * 1.1 - 1);
    Booking.create.mockResolvedValue(booking);

    const createdBooking = await BookingService.create(bookingData);
    expect(createdBooking).toEqual(booking);
  });

  it('creates a booking on valid request', async () => {
    const capacity = 100;
    const event = { id: 'eventId', capacity, date: new Date('2023-10-20') };
    const bookingData = { contact: 'foo', eventId: 'eventId' };
    const booking = { id: 'bookingId', ...bookingData };

    Event.find.mockResolvedValue(event);
    Booking.CountByEventId.mockResolvedValue(capacity - 1);
    Booking.create.mockResolvedValue(booking);

    const createdBooking = await BookingService.create(bookingData);
    expect(createdBooking).toEqual(booking);
  });

  describe('when updating booking', function () {

    it('throws error if event is less than 48 hours in the future', async () => {
      const day1FromNow = dateFromDaysDiff(1);
      const event = { id: 'eventId', capacity: 100, date: day1FromNow };
      const booking = { id: 'bookingId', contact: 'foo', eventId: 'eventId', active: true };

      Booking.find.mockResolvedValue(booking);
      Event.find.mockResolvedValue(event);

      await expect(BookingService.update('bookingId', { active: false }))
        .rejects
        .toThrow('Can not be changed!');
    });

    it('allows update if event is more than 48 hours in the future', async () => {
      const day3FromNow = dateFromDaysDiff(3);
      const event = { id: 'eventId', capacity: 100, date: day3FromNow };
      const booking = { id: 'bookingId', contact: 'foo', eventId: 'eventId', active: true };
      const updatedBookingData = { id: 'bookingId', contact: 'foo', eventId: 'eventId', active: false };

      Booking.find.mockResolvedValue(booking);
      Event.find.mockResolvedValue(event);
      Booking.update.mockResolvedValue(updatedBookingData);

      const updatedBooking = await BookingService.update('bookingId', {active: false});
      expect(updatedBooking).toEqual(updatedBookingData);
    });

  });

});


