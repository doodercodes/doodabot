const GuildDB = require('../../../backend/guildDB');
const db = new GuildDB();

module.exports = async (_, guild) => {
  try {
    await db.query('UPDATE Guilds SET is_member = 0 WHERE guild_id = ? ', [
      guild.id,
    ]);
  } catch (err) {
    console.error(`Error updating Guilds: ${err}`);
  }
};
