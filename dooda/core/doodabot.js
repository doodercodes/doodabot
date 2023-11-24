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
   * Starts events when the full client connection process is finished.
   */
  ready() {
    // this.log.log('---------------------------');
    this.log.info(`Successfully logged in as ${this.user.username}.`);
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
      return;
    }

    this.once('ready', () => {
      this.ready();
    });

    /*     this.loadEvents();
    this.loadCommands(); */
    /*     this.on('interactionCreate', async (interaction) => {
      // if (!interaction.isChatInputCommand()) return;
      if (!interaction.isCommand()) return;
      // const { commandName, options, user, guildId } = interaction;
    }); */
  }
}

module.exports = Doodabot;
