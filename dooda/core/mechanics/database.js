const mysql = require('mysql');
const util = require('util');

/* class Setup {
  constructor() {
    this.pool = mysql.createPool({});
    this.query;
  }
} */

class Database {
  constructor(bot, db_cfg) {
    this.bot = bot;
    this.db_cfg = db_cfg;
    this.db_name = this.db_cfg.database;
  }
  createPool() {
    //
  }
}
