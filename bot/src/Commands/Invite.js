const { EmbedBuilder } = require('discord.js');
const Command = require('../Structures/Command');

class Invite extends Command {
  constructor() {
    super({
      name: 'invite',
      desc: "Get the bot's invitation link.",
      usage: '',
      perms: {
        channel: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
        member: [],
      },
      aliases: ['inv'],
    });
  }
  async run(client, message, args) {
    message.channel.send({
      embeds: [createEmbed(client)],
    });
  }
}

function createEmbed(client) {
  return new EmbedBuilder()
    .setColor(client.botconfig.Theme.main[0])
    .setDescription(`Click [here](${client.user.inviteURL}) to invite me.`);
}

module.exports = Invite;
