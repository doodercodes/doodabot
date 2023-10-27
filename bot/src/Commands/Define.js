const { EmbedBuilder } = require('discord.js');
const Command = require('../Structures/Command');
const ud = require('urban-dictionary');

class Define extends Command {
  constructor() {
    super(
      'define',
      '',
      '',
      {
        channel: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'],
        member: [],
      },
      ['dict', 'definition', 'define', 'def', 'ud']
    );
  }

  async run(client, message, args) {
    const word = await define(message, args);

    if (!word) return;

    const embed = createEmbed(message, word);
    message.channel.send({
      embeds: [embed],
    });
  }
}

function search(message, args) {
  if (args.length === 0) {
    message.reply('Please provide something to search');
    return;
  }

  //TODO set a character limit
  return args.join(' ');
}

async function define(message, args) {
  try {
    const input = search(message, args);

    if (!input) return;
    
    const [...lookup] = await ud.define(input);
    return lookup.reduce((prev, current) => {
      return current.thumbs_up > prev.thumbs_up ? current : prev;
    });
  } catch (err) {
    console.error(err);
  }
}

function createEmbed(message, word) {
  return new EmbedBuilder()
    .setTitle(word.word)
    .setURL(word.permalink)
    .addFields(
      {
        name: 'Definition',
        value: word.definition,
        inline: false,
      },
      {
        name: 'Example',
        value: word.example,
        inline: false,
      },
      {
        name: 'Rating',
        value: `${word.thumbs_up} 👍 || ${word.thumbs_down} 👎`,
        inline: false,
      }
    )
    .setFooter({
      text: `Command issued by ${message.author.tag}`,
      iconURL: message.author.displayAvatarURL(),
    });
}

module.exports = Define;
