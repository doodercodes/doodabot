const { DefaultPrefix } = require('./botconfig');
const mysql = require('mysql');
const util = require('util');

class GuildDB {
  db = 'doodabot';
  pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: '',
  });
  query = util.promisify(this.pool.query).bind(this.pool); // Promisify the pool query function

  constructor() {}
  async init() {
    await this.query(`CREATE DATABASE IF NOT EXISTS ${this.db};`);
    await this.query(`USE ${this.db};`);
    await this.query(`
        CREATE TABLE IF NOT EXISTS Guilds (
          ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
          guild_id BIGINT NOT NULL UNIQUE,
          name VARCHAR(255) NOT NULL,
          prefix CHAR(1) DEFAULT '${DefaultPrefix}' NOT NULL,
          joined_date TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP,
          cmds_ran BIGINT DEFAULT 0 NOT NULL,
          is_member BOOL DEFAULT TRUE NOT NULL,
          is_banned BOOL DEFAULT FALSE NOT NULL,
          PRIMARY KEY(ID)
      ) ENGINE = InnoDB;`);
    await this.query(`
        CREATE TABLE IF NOT EXISTS Members (
          ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
          guild_id BIGINT DEFAULT 0 NOT NULL,
          user_id BIGINT NOT NULL UNIQUE,
          username VARCHAR(255) NOT NULL,
          cmds_ran BIGINT DEFAULT 0 NOT NULL,
          is_banned BOOL DEFAULT FALSE NOT NULL,
          PRIMARY KEY(ID),
          FOREIGN KEY (guild_id) REFERENCES Guilds(guild_id)
      ) ENGINE = InnoDB;`);
  }
  async connection(cb) {
    this.onConnect();
    return this.pool.getConnection(async (err, _) => {
      if (err) {
        console.log(`Error getting connection from pool: ${err}`);
        // reject(err);
        return;
      }

      await cb(_)
        .then(() => {
          this.pool.end(() => {
            console.log('All connections in the pool have ended\r\n');
          });
        })
    
    });
  }

  onConnect() {
    this.pool.on('connection', (_) => {
      console.log(`- Connection made to Database: ${this.db}`);
    });
  }
}

module.exports = {
  db: new GuildDB(),
};
