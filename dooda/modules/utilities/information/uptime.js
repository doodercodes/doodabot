const DoodabotCommand = require('../../../core/mechanics/command');

class UptimeCommand extends DoodabotCommand {
  constructor(bot) {
    super();
    this.bot = bot;
    this.name = 'Uptime';
    this.category = 'utility';
    this.aliases = ['up'];
    this.usage = '!uptime';
    this.desc = "Check the bot's uptime.";
  }

  async run(msg) {
    const bot = this.bot;
    const days = Math.floor(bot.uptime / 86400000);
    const hrs = Math.floor(bot.uptime / 3600000) % 24;
    const minutes = Math.floor(bot.uptime / 60000) % 60;
    const seconds = Math.floor(bot.uptime / 1000) % 60;

    const uptimeMessage = `Uptime: ${days}d ${hrs}h ${minutes}m ${seconds}s`;
    msg.channel.send(uptimeMessage);
  }
}

module.exports = UptimeCommand;
