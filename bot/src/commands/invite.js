const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'invite',
  description: 'To invite me to your server',
  usage: '',
  permissions: {
    channel: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'],
    member: [],
  },
  aliases: ['inv'],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args) => {
    const inviteURL = client.user.inviteURL;
    let embed = new EmbedBuilder()
      .setColor(client.botconfig.Theme.main[0])
      .setDescription(`Click [here](${inviteURL}) to invite me.`);

    message.channel.send({ embeds: [embed] });
  },
};

// &redirect_url=${client.botconfig.Website}${client.botconfig.CallbackURL}&response_type=code)`
