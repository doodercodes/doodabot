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
    new ModuleManager(this);
    this.commands = new Collection();
    this.log = new Logger();
    this.config = config;
    this.prefs = this.config.prefs;
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
