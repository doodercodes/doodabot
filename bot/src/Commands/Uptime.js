const Command = require('../Structures/Command');

class Uptime extends Command {
  constructor() {
    super({
      name: 'uptime',
      desc: 'Shows how long the bot has been running',
      usage: '',
      perms: {
        channel: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
        member: [],
      },
      aliases: [''],
    });
  }
  async run(client, message, args) {
    message.channel.send(uptime(client, message));
  }
}

function uptime(client, message) {
  const days = Math.floor(client.uptime / 86400000);
  const hrs = Math.floor(client.uptime / 3600000) % 24;
  const minutes = Math.floor(client.uptime / 60000) % 60;
  const seconds = Math.floor(client.uptime / 1000) % 60;
  return `__Uptime:__\n${days}d ${hrs}h ${minutes}m ${seconds}s`;
}

module.exports = Uptime;
