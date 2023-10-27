const { EmbedBuilder } = require('discord.js');
const Command = require('../Structures/Command');

class Config extends Command {
  constructor() {
    super({
      name: 'config',
      desc: '',
      usage: '',
      perms: {
        channel: [],
        member: [],
      },
      aliases: ['setup'],
    });
  }
  async run(client, message, args) {}
}

module.exports = Config;
