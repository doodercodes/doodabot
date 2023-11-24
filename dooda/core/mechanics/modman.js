const DoodabotCommand = require('./command');
const DoodabotEvent = require('./event');
const Logger = require('./logger');
const fs = require('fs');
const path = require('path');

class ModuleManager {
  constructor(bot) {
    this.bot = bot;
    this.log = new Logger();
    this.commands = {};

    this.loadAllModules();
  }

  async loadAllModules() {
    const dir = path.join(__dirname, '../../modules/');
    try {
      for (const [root, _dirs, files] of walkSync(dir)) {
        if (root === path.join(__dirname, '../../modules/events'))
          await this.loadEvents(root, _dirs, files);
        else await this.loadCommands(root, _dirs, files);
      }
    } catch (err) {
      this.log.error(`Error reading modules directory: ${err.message}`);
    }
  }

  async loadEvents(root, _dirs, files) {}

  async loadCommands(root, _dirs, files) {
    for (const file of files) {
      const filePath = path.join(root, file);
      if (path.extname(filePath) !== '.js') continue;
      try {
        const Command = require(filePath);
        const CreateCommand = new DoodabotCommand(this.bot);
        const cmd = new Command(CreateCommand);
        await this.setCommand(cmd, file);
      } catch (err) {
        this.log.error(`Failed to load command ${cmd.name}: ${err.message}`);
      }
    }
  }

  async setCommand(command, file) {
    try {
      const { cmd } = command;
      if (cmd.name && cmd.run) {
        this.bot.commands.set(cmd.name.toLowerCase(), command);
        this.commands[nameToLower] = cmd;
        this.log.info(`Loaded the ${cmd.name} command.`);
      }
    } catch (err) {
      this.log.error(`Cannot set command in: ${file}: ${err.message}`);
    }
  }
}

function* walkSync(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const pathToFile = path.join(dir, file);
    const isDirectory = fs.statSync(pathToFile).isDirectory();
    if (isDirectory) yield* walkSync(pathToFile);
    else yield [dir, files, files];
  }
}

module.exports = ModuleManager;
