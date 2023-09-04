const {
  ActivityType,
  Client,
  Collection,
  EmbedBuilder,
  GatewayIntentBits,
  Partials,
} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const Logger = require('./Logger');

class Doodabot extends Client {
  constructor(props) {
    super(props);

    this.botconfig = require('../../botconfig');
    this.commands = new Collection();
    const botconfig = this.botconfig;
    this.prefix = botconfig.DefaultPrefix;
    // const client = this;

    this.database = {};
    this.logger = new Logger(path.join(__dirname, '..', 'Logs.log'));

    this.loadEvents();
    this.loadCommands();
  }

  build() {
    this.login(process.env.TOKEN, () => {});
    console.log();
  }

  log(text) {
    this.logger.log(text);
  }

  loadCommands() {
    const dir = path.join(__dirname, '..', 'commands');

    return new Promise((resolve, reject) => {
      try {
        const files = fs.readdirSync(dir);

        files.forEach((file) => {
          const cmd = require(path.join(dir, file));
          if (!cmd.name || !cmd.description || !cmd.run) {
            console.log(`Invalid command in file: `.red + `${file}`);
            return;
          } else
            console.log(`Command loaded successfully: `.green + `${cmd.name}`);
        });

        resolve(); // Resolve the promise when all commands are loaded.
      } catch (err) {
        console.error(`${err.message}`.red);
        reject(err); // Reject the promise if there's an error.
      }
    });
  }

  loadEvents() {
    const dir = path.join(__dirname, '..', 'events');

    fs.readdir(dir, (err, files) => {
      if (err) console.log(err);
      else
        files.forEach((file) => {
          const event = require(dir + '/' + file);
          this.on(file.split('.')[0], event.bind(null, this));
          console.log(`Event Loaded successfully: `.green + file.split('.')[0]);
        });
    });
  }
}

module.exports = { Doodabot, GatewayIntentBits };
