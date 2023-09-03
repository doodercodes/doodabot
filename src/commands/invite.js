const { EmbedBuilder } = require('discord.js');
const botconfig = require('../../botconfig');

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
  run: async (client, message, args, { GuildDB }) => {
    let embed = new EmbedBuilder();
    embed.setColor(botconfig.Theme.main[0]).setTitle('Bot invite');

    message.channel.send(embed);
  },
};
/*
`You can invite me by clicking [here](https://discord.com/oauth2/authorize?client_id=${
          client.botconfig.ClientID
        }&permissions=${
          client.botconfig.Permissions
        }&scope=bot%20${client.botconfig.Scopes.join('%20')}&redirect_url=${
          client.botconfig.Website
        }${client.botconfig.CallbackURL}&response_type=code)`
*/
