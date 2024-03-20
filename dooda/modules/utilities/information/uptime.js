class UptimeCommand {
  constructor(cmd) {
    this.cmd = cmd;
    cmd.name = 'Uptime';
    cmd.category = 'utility';
    cmd.aliases = ['up'];
    cmd.usage = '!uptime';
    cmd.desc = 'Check the bot\'s uptime.';
  }

  async run(msg) {
    const bot = this.cmd.bot;
    const days = Math.floor(bot.uptime / 86400000);
    const hrs = Math.floor(bot.uptime / 3600000) % 24;
    const minutes = Math.floor(bot.uptime / 60000) % 60;
    const seconds = Math.floor(bot.uptime / 1000) % 60;

    const uptimeMsg = `Uptime: ${days}d ${hrs}h ${minutes}m ${seconds}s`;
    msg.channel.send(uptimeMsg);
  }
}

module.exports = UptimeCommand;
