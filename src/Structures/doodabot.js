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
const Jsoning = require('jsoning');

class Doodabot extends Client {
  constructor(props) {
    super(props);

    this.botconfig = require('../../botconfig');
    this.commands = new Collection();
    const botconfig = this.botconfig;
    this.prefix = botconfig.DefaultPrefix;
    // const client = this;

    this.database = {
      guild: new Jsoning('guild.json'),
    };
    this.logger = new Logger(path.join(__dirname, '..', 'Logs.log'));

    this.loadEvents();
    this.loadCommands();
  }

  build() {
    this.login(process.env.TOKEN, () => {});
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
    fs.readdir(dir, (err, files) => {
      if (err) console.log(err);
      else
        files.forEach((file) => {
          const event = require(dir + '/' + file);
          this.on(file.split('.')[0], event.bind(null, this));
          console.log(`Event loaded successfully: `.green + file.split('.')[0]);
        });
    });
  }

  async getGuild(guildID) {
    return new Promise(async (res, rej) => {
      let guild = await this.database.guild.get(guildID);
      // .catch((err) => rej(err));
      res(guild);
    });
  }
module.exports = { Doodabot, GatewayIntentBits };
