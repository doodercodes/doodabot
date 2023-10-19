const { EmbedBuilder } = require('discord.js');
const Command = require('../Structures/Command');

class Config extends Command {
  constructor() {
    super(
      '',
      '',
      '',
      {
        channel: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'],
        member: [],
      },
      ['']
    );
  }
  async run(client, message, _) {}
}

module.exports = Config;
