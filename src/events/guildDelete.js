const { query } = require('../guildDB');

module.exports = async (client, guild) => {
  console.log(`Bot was kicked/banned from ${guild.id}`);
  //   await query(`
  //     UPDATE guild
  //     SET is_member = 0
  //     WHERE guild_id = ${guild.id};
  // `);
};
