const GuildDB = require('../backend/guildDB');
const db = new GuildDB();

db.init().then(() => {
  console.log('init db');
});
