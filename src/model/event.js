const db = require('../../db/db');

class Event {
  async index() {
    return db.select().from('events');
  }

  async find(id) {
    return db('events').where({ id }).first();
  }
}

module.exports = new Event();