const GuildDB = require('../../../backend/guildDB');
const db = new GuildDB();

async function checkPerms(client, cmd, message) {
  // Check if the user or guild is banned from using the bot
  if (await isUserBanned(message.guild.id, message.author.id))
    return client.sendError(message.channel, 'Banned');

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
}

async function isUserBanned(guildId, userId) {
  try {
    await db.query(`use ${db.db}`);
    // Check if the user is banned in the Guilds table
    const guildResult = await db.query(
      `SELECT is_banned FROM Guilds WHERE guild_id = '${guildId}'`
    );

    // Check if the user is banned in the Members table
    const memberResult = await db.query(
      `SELECT is_banned FROM Members WHERE guild_id = '${guildId}' AND user_id = '${userId}'`
    );

    // User or Guild is banned in the Guilds table
    return guildResult[0].is_banned || memberResult[0].is_banned;
  } catch (err) {
    console.error(`Error checking user ban status: ${err}`);
  }
}

function getCommandPrefix(client, message) {
  const botconfig = client.botconfig;
  const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
  const content = message.content;

  return content.startsWith(botconfig.DefaultPrefix)
    ? botconfig.DefaultPrefix
    : content.match(prefixMention)
    ? content.match(prefixMention)[0]
    : null;
}

function findCommand(client, message, prefix) {
  // Split the message into an array of arguments and the command
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = findRegisteredOrAliasCommand(client, command);
  return { cmd, args };
}

function findRegisteredOrAliasCommand(client, command) {
  // Find the command in the bot's registered commands or aliases
  return (
    client.commands.get(command) ||
    client.commands.find((x) => x.aliases && x.aliases.includes(command))
  );
}

async function isUserInMemberDatabase(guildId, userId, username) {
  try {
    await db.query(`use ${db.db}`);
    let memberResult = await db.query(
      `SELECT user_id FROM Members WHERE guild_id = '${guildId}' AND user_id = '${userId}'`
    );

    if (memberResult && memberResult.length === 0) return false;
    return true;
  } catch (err) {
    console.error(`Error checking member database: ${err}`);
  }
}

async function insertUserIntoMemberDatabase(guildId, userId, username) {
  if (!(await isUserInMemberDatabase(guildId, userId, username))) {
    try {
      await db.query(`use ${db.db}`);
      await db.query(
        `
      INSERT INTO Members (guild_id, user_id, username)
      VALUES ('${guildId}', '${userId}', '${username}');
      `
      );
    } catch (err) {
      console.error(`Failed to add new user to Member Database: ${err}`);
    }
  }
}

module.exports = async (client, message) => {
  if (message.author.bot || message.channel.type === 'dm') return;

  const prefix = getCommandPrefix(client, message);

  await insertUserIntoMemberDatabase(
    message.guild.id,
    message.author.id,
    message.author.username
  );

  // If the message doesn't start with the prefix, ignore it
  if (!prefix) return;

  const { cmd, args } = findCommand(client, message, prefix);

  if (cmd) {
    await checkPerms(client, cmd, message);

    // Run the command
    cmd.run(client, message, args);
  }
  // If the command is not found, do nothing
  else return;
};
