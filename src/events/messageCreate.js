module.exports = async (client, message) => {
  if (message.author.bot || message.channel.type === 'dm') return;

  /*   let guildDB = await client.getGuild(message.guild.id);
  if (guildDB && guildDB.prefix) prefix = guildDB.prefix;

  //Initialize GuildDB
  if (!guildDB) {
    await client.database.guild.set(message.guild.id, {
      prefix: prefix,
    });
    guildDB = await client.getGuild(message.guild.id);
  } */

  // Define the prefix for commands (DefaultPrefix is assumed to be defined elsewhere)
  let prefix = client.botconfig.DefaultPrefix;

  // Create a regular expression to match the bot mention as a prefix
  const prefixMention = new RegExp(`^<@!?${client.user.id}> `);

  // Update the prefix if the message starts with a mention of the bot
  prefix = message.content.match(prefixMention)
    ? message.content.match(prefixMention)[0]
    : prefix;

  // If the message doesn't start with the prefix, ignore it
  if (message.content.indexOf(prefix) !== 0) return;

  // Split the message into an array of arguments and the command
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Find the command in the bot's registered commands or aliases
  const cmd =
    client.commands.get(command) ||
    client.commands.find((x) => x.aliases && x.aliases.includes(command));

  // If the command is found
  if (cmd) {
    // Check if the user has the required permissions to run the command
    const perms = cmd.permissions;
    if (
      (perms &&
        perms.channel &&
        !message.channel.permissionsFor(client.user).has(perms.channel)) ||
      (perms &&
        perms.member &&
        !message.channel.permissionsFor(message.member).has(perms.member))
    )
      return client.sendError(message.channel, 'Missing permissions');

    // Run the command
    cmd.run(client, message, args);
  }
  // If the command is not found, do nothing
  else return;
};
