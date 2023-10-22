const { EmbedBuilder } = require('discord.js');
const ud = require('urban-dictionary');
const Command = require('../Structures/Command');

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
    const def = await define(args);
    const embed = new EmbedBuilder()
      .setColor('Green')
      .setTitle(def.word)
      .setDescription(def.definition)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
}

async function define(args) {
  if (args.length <= 0) return;
  let lookup = args.join(' ');
  try {
    lookup = await ud.define(lookup);
    const result = lookup.reduce((prev, current) => {
      return current.thumbs_up > prev.thumbs_up ? current : prev;
    });
    return result;
  } catch (err) {
    console.log(err);
  }
}

module.exports = Define;
