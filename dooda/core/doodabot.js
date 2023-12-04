const { Client, Collection, EmbedBuilder, Events } = require('discord.js');
const ModuleManager = require('./mechanics/modman');
const Config = require('./mechanics/config');
const Logger = require('./mechanics/logger');

const config = new Config();

class Doodabot extends Client {
  constructor() {
    super({
      intents: config.dsc.intents,
    });
    this.commands = new Collection();
    this.log = new Logger();
    this.config = config;
    this.prefs = this.config.prefs;
    new ModuleManager(this);
  }

  async build() {
    try {
      await this.login(this.config.dsc.token);
    } catch (err) {
      this.log.error(err.message);
    }
  }
}

module.exports = Doodabot;
