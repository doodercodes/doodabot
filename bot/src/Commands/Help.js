const { EmbedBuilder } = require('discord.js');
const Command = require('../Structures/Command');

class Help extends Command {
  constructor() {
    super({
      name: 'help',
      desc: 'Get a list of commands or information about a specific command.',
      usage: '',
      perms: {
        channel: [],
        member: [],
      },
      aliases: [''],
    });
  }
  async run(client, message, args) {}
}

module.exports = Help;
