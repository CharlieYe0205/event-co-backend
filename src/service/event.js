const Event = require('../model/event');

class EventService {
  async index() {
    return Event.index();
  }

  async find(id) {
    return Event.find(id);
  }
}

module.exports = new EventService();