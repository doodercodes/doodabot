const { EmbedBuilder } = require('discord.js');
const Command = require('../Structures/Command');

class Uptime extends Command {
  constructor() {
    super(
      'uptime',
      '',
      '',
      {
        channel: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'],
        member: [],
      },
      ['inv']
    );
  }
  async run(client, message, _) {
    uptime(client, message);
  }
}

function uptime(client, message) {
  const days = Math.floor(client.uptime / 86400000);
  const hrs = Math.floor(client.uptime / 3600000) % 24;
  const minutes = Math.floor(client.uptime / 60000) % 60;
  const seconds = Math.floor(client.uptime / 1000) % 60;
  const uptime = `__Uptime:__\n${days}d ${hrs}h ${minutes}m ${seconds}s`;
  message.channel.send(uptime);
}

module.exports = Uptime;
