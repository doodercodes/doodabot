const mysql = require('mysql');
const util = require('util');

class DoodabotDatabase {
  constructor(cfg) {
    this.cfg = cfg;
  }
  createGuild() {
    return `
    CREATE TABLE IF NOT EXISTS Guilds(
      ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
      guild_id BIGINT NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      prefix CHAR(1) DEFAULT '${this.cfg.pfx}' NOT NULL,
      joined_date TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP,
      cmds_ran BIGINT DEFAULT 0 NOT NULL,
      is_member BOOL DEFAULT TRUE NOT NULL,
      is_banned BOOL DEFAULT FALSE NOT NULL,
      PRIMARY KEY(ID)
  ) ENGINE = InnoDB;`;
  }

  createMember() {
    return `
    CREATE TABLE IF NOT EXISTS Members (
      ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
      guild_id BIGINT DEFAULT 0 NOT NULL,
      user_id BIGINT NOT NULL UNIQUE,
      username VARCHAR(255) NOT NULL,
      cmds_ran BIGINT DEFAULT 0 NOT NULL,
      is_banned BOOL DEFAULT FALSE NOT NULL,
      PRIMARY KEY(ID),
      FOREIGN KEY (guild_id) REFERENCES Guilds(guild_id)
  ) ENGINE = InnoDB;`;
  }
}

class Database {
  constructor(bot, cfg) {
    this.bot = bot;
    this.db_cfg = cfg;
    this.db = this.db_cfg.db;
    this.pool = this.createPool();
    this.query = util.promisify(this.pool.query).bind(this.pool);
  }
  createPool() {
    return mysql.createPool(this.db_cfg);
  }

  async init() {
    const doodabotDB = new DoodabotDatabase(this.bot.cfg.prefs);
    doodabotDB.createGuild();
    doodabotDB.createMember();
  }
}

module.exports = Database;
