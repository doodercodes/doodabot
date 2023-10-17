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
  run: async (client, message, args) => {
    const inviteURL = client.user.inviteURL;
    let embed = new EmbedBuilder()
      .setColor(client.botconfig.Theme.main[0])
      .setDescription(`Click [here](${inviteURL}) to invite me.`);

    message.channel.send({ embeds: [embed] });
  },
};
