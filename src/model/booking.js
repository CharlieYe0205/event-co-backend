const db = require('../../db/db');

class Booking {
  async find(id) {
    return db('bookings').where({ id }).first();
  }

  async findByEventId(eventId) {
    return db('bookings').where({ event_id: eventId });
  }

  async CountByEventId(eventId) {
    const result = await db('bookings').where({ event_id: eventId, active: true }).count();

    return parseInt(result[0].count);
  }

  async create({ contact, eventId }) {
    const result = await db('bookings')
      .insert(
        { contact, event_id: eventId },
        ['id', 'contact', 'event_id', 'active']
      );

    return result[0];
  }

  async update(id, { active }) {
    const result = await db('bookings')
      .where({ id })
      .update(
        { active },
        ['id', 'contact', 'event_id', 'active']
      );

    return result[0];
  }
}

module.exports = new Booking();