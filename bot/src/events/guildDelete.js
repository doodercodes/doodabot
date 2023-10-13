const GuildDB = require('../../../backend/guildDB');
const db = new GuildDB();

module.exports = async (client, guild) => {
  await db.connection(async (_) => {
    await queries();
  });

  async function queries() {
    await db.query(`use ${db.db}`);
    await db.query(
      `
          UPDATE Guilds
          SET is_member = '0'
          WHERE guild_id = '${guild.id}';
      `
    );
  }
};
