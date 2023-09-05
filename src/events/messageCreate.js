module.exports = async (client, message) => {
  if (message.author.bot || message.channel.type === 'dm') return;

  let prefix = client.prefix;

  let guildDB = await client.getGuild(message.guild.id);
  if (guildDB && guildDB.prefix) prefix = guildDB.prefix;

  //Initialize GuildDB
  if (!guildDB) {
    await client.database.guild.set(message.guild.id, {
      prefix: prefix,
    });
    guildDB = await client.getGuild(message.guild.id);
  }

  const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
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

  if (cmd) {
    console.log('Command was executed:'.green);
    console.log(cmd);
    console.log();
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

    // run command
    cmd.run(client, message, args, { guildDB });
  } else return;
};
