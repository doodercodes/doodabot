const { Client, Collection, EmbedBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const Logger = require('./Logger');
const util = require('util');

class Doodabot extends Client {
  constructor(props) {
    super(props);

    const client = this; // just in case

    this.botconfig = require('../botconfig');
    this.logger = new Logger(path.join(__dirname, '..', 'Logs.log'));
    this.commands = new Collection();
  }

  loadCommands() {
    const dir = path.join(__dirname, '..', 'commands');
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const cmd = require(path.join(dir, file));
      if (!cmd.name || !cmd.description || !cmd.run) {
        console.log(`Invalid command in file: `.red + `${file}`);
        return;
      } else {
        this.commands.set(file.split('.')[0].toLowerCase(), cmd);
        console.log(`Command loaded successfully: `.green + `${cmd.name}`);
      }
    });
  }

  loadEvents() {
    const dir = path.join(__dirname, '..', 'events');
    const interactionFiles = fs
      .readdirSync(dir)
      .filter((file) => file.endsWith('.js'));
    fs.readdir(dir, (err, files) => {
      if (err) throw err;
      else console.log('');
      files.forEach((file) => {
        const event = require(dir + '/' + file);
        this.on(file.split('.')[0], event.bind(null, this));
        console.log(`Event loaded successfully: `.green + file.split('.')[0]);
      });
    });
  }

  /*   loadInteractions() {
    const dir = path.join(__dirname, '..', 'interactions');
    fs.readdir(dir, (err, files) => {
      if (err) throw err;
      console.log('');
      files.forEach((file) => {
        const interaction = require(dir + '/' + file);
        if (typeof interaction === 'function') {
          this.on(file.split('.')[0], async (interactionHandler) => {
            interactionHandler.call(this, this);
          });
          console.log(
            `Interaction loaded successfully: `.green + file.split('.')[0]
          );
        } else console.log(`Invalid interaction in file: ${file}`);
      });
    });
  } */

  sendError(channel, error) {
    const embed = new EmbedBuilder()
      .setColor('Red')
      .setTitle('An error occurred')
      .setDescription(error)
      .setTimestamp()
      .setFooter(
        'If you think this was a bug, please report it in the report server'
      );
    channel.send({ embeds: [embed] });
  }

  log(text) {
    this.logger.log(text);
  }

  build() {
    this.login(this.botconfig.APP.TOKEN, () => {});
    this.loadEvents();
    this.loadCommands();
    // this.loadInteractions();
    /*     console.log(this.commands);
    this.commands.forEach((cmd) => {}); */

    this.on('interactionCreate', async (interaction) => {
      // if (!interaction.isChatInputCommand()) return;
      if (!interaction.isCommand()) return;
      // const { commandName, options, user, guildId } = interaction;
    });
  }
}

module.exports = { Doodabot };
