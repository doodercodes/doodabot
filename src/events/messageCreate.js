module.exports = async (client, message) => {
  let prefix = client.prefix;
  const prefixMention = new RegExp(`^<@!?${client.user.id}> `);

  if (message.author.bot || message.channel.type === 'dm') return;

  prefix = message.content.match(prefixMention)
    ? message.content.match(prefixMention)[0]
    : prefix;

  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  //Making the command lowerCase because our file name will be in lowerCase
  const command = args.shift().toLowerCase();

  //Searching a command
  const cmd =
    client.commands.get(command) ||
    client.commands.find((x) => x.aliases && x.aliases.includes(command));
};
