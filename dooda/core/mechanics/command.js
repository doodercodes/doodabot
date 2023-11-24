class DoodabotCommand {
  constructor(bot) {
    this.bot = bot;
    this.log = this.bot.log;
    this.name = '';
    this.category = '';
    this.aliases = [];
    this.usage = '';
    this.desc = '';
    this.perms = {
      channel: [],
      member: [],
    };
    this.owner = false;
    this.nsfw = false;
    this.enabled = true;
  }
  async run() {}
  
}

module.exports = DoodabotCommand;
