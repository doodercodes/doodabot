const GuildDB = require('../../../backend/guildDB');
const db = new GuildDB();

async function processGuildAndMembers(guild, members) {
  await guildQueries(guild, members);
  for (const member of members.values()) await memberQueries(guild, member);
}

async function guildQueries(guild) {
  try {
    await db.query('INSERT INTO Guilds (guild_id, name) VALUES (?, ?)', [
      guild.id,
      guild.name,
    ]);
  } catch (err) {
    await db.query(
      'UPDATE Guilds SET is_member = 1, joined_date = CURRENT_TIMESTAMP WHERE guild_id = ?',
      [guild.id]
    );
  }
}

async function memberQueries(guild, member) {
  try {
    await db.query(
      'INSERT IGNORE INTO Members (guild_id, user_id, username) VALUES (?, ?, ?)',
      [guild.id, member.user.id, member.user.username]
    );
  } catch (err) {
    console.error(`Error inserting into Members: ${err}`);
  }
}

module.exports = async (_, guild) => {
  await processGuildAndMembers(
    guild,
    guild.members.fetch().filter((member) => !member.user.bot)
  );
};
