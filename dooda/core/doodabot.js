const { Client, Collection } = require('discord.js');
const ModuleManager = require('./mechanics/modman');
const Database = require('./mechanics/database');
const Config = require('./mechanics/config');
const Logger = require('./mechanics/logger');

const cfg = new Config();

class Doodabot extends Client {
  constructor() {
    super({
      intents: cfg.dsc.intents,
    });
    this.cfg = cfg;
    this.modules;
    this.db;
    this.log = new Logger();
    this.cmds = new Collection();

    this.setupHook();
  }

  async setupHook() {
    this.modules = this.initModules();
    this.db = await this.initDatabase();
  }

  async initDatabase() {
    this.log.info('Connecting to Database...');
    const db = new Database(this, this.cfg.db);
    return db;
  }

  initModules() {
    this.log.info('Initializing Modules...');
    return new ModuleManager(this);
  }

  async build() {
    try {
      await this.login(this.cfg.dsc.token);

      this.application.commands.create({
        name: 'ping',
        description: 'Pong!',
        type: 1,
      });
    } catch (err) {
      this.log.error(err.message);
    }
  }
}

module.exports = Doodabot;
