const { db } = require('../guildDB');
const timestamp = require('time-stamp');

module.exports = async (client, guild) => {
  console.log(`\r\nBot joined server: ${guild.id}`);

  await db.init();

  await db.connection(async (_) => {
    await queries();
  });

  async function queries() {
    await db.query(`use ${db.db}`);
    await db
      .query(
        `INSERT INTO Guilds (guild_id, name) VALUES ('${guild.id}', '${guild.name}');`
      )
      .catch(async (err) => {
        await db.query(
          `
            UPDATE Guilds
            SET is_member = '1', joined_date = CURRENT_TIMESTAMP
            WHERE guild_id = '${guild.id}';
        `
        );
      });
  }
};
