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
    this.config = config;
    this.log = new Logger();
    this.prefs = this.config.prefs;

    this.initModules();
  }

  /**
   * Check if the bot is ready.
   * @return {bool} ready or not
   */
  isReady() {}

  async initModules() {
    return new ModuleManager(this);
  }

  async build() {
    try {
      await this.login(this.config.dsc.token);
    } catch (err) {
      this.log.error(err.message);

      // this.build(); TODO: mechanism to restart the bot on login fail
    }

    /*     this.on('interactionCreate', async (interaction) => {
      // if (!interaction.isChatInputCommand()) return;
      if (!interaction.isCommand()) return;
      // const { commandName, options, user, guildId } = interaction;
    }); */
  }
}

module.exports = Doodabot;
