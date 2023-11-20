const Logger = require('./logger');

class DoodabotCommand {
  constructor(bot) {
    this.bot = bot;
    // this.db = this.bot.config;
    this.nsfw = false;
    this.owner = false;
    this.logger = new Logger();
    this.name;
    this.category;
    this.enabled = true;
    this.perms = {
      channel: [],
      member: [],
    };
    this.aliases = [];
    this.usage;
    this.desc;
    this.type = 'command';
  }
  async run() {}
}

module.exports = DoodabotCommand;
