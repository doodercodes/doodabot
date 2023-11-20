const Logger = require('./logger');

class DoodabotEvent {
  constructor(bot) {
    this.bot = bot;
    this.desc;
    this.logger = new Logger();
    this.name;
  }
  run() {}
}

module.exports = DoodabotEvent;
