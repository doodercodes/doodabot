const DoodabotCommand = require('./command');
const DoodabotEvent = require('./event');
const Logger = require('./logger');
const fs = require('fs');
const path = require('path');

class ModuleManager {
  constructor(bot) {
    this.bot = bot;
    this.commands = {};

    this.loadAllModules();
  }

  async loadAllModules() {
    const modulesDir = '../../modules/';
    const eventsDir = modulesDir + 'events';
    let fullPath, moduleName;
    for (const [root, file] of walkSync(path.join(__dirname, modulesDir))) {
      fullPath = path.join(root, file);
      if (path.extname(fullPath) !== '.js') continue;
      moduleName = file.split('.')[0];
      if (root === path.join(__dirname, eventsDir)) {
        await this.loadEvents(file, fullPath, moduleName);
      } else {
        await this.loadCommands(file, fullPath, moduleName);
      }
    }
  }

  async loadEvents(file, fullPath, moduleName) {
    const Event = require(fullPath);
    const CreateEvent = new DoodabotEvent(this.bot, moduleName);
    const event = new Event(CreateEvent);
    if (typeof event.execute !== 'function') {
      this.bot.log.warn(
        `The \`${moduleName}\` event does not have a valid execute method.`
      );
      // CreateEvent.main(event);
      // this.bot.log.info(`Loaded the ${moduleName} event.`);
    }
  }

  async loadCommands(file, fullPath, moduleName) {
    try {
      const Command = require(fullPath);
      const CreateCommand = new DoodabotCommand(this.bot);
      const cmd = new Command(CreateCommand);
      await this.setCommand(cmd, file);
      this.bot.log.info(`Loaded the ${moduleName} command.`);
    } catch (err) {
      this.bot.log.error(`Failed to load command in \`${file}\`: ${err}`);
    }
  }

  async setCommand(command, file) {
    try {
      const { cmd } = command;
      const cmdName = cmd.name;
      const cmdNameLower = cmdName.toLowerCase();
      if (cmdName && cmd.run) {
        this.bot.commands.set(cmdNameLower, command);
        this.commands[cmdNameLower] = cmd;
      }
    } catch (err) {
      this.bot.log.error(`Cannot set command in \`${file}\`: ${err}`);
    }
  }
}

function* walkSync(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const pathToFile = path.join(dir, file);
    const isDirectory = fs.statSync(pathToFile).isDirectory();
    if (isDirectory) {
      yield* walkSync(pathToFile);
    } else {
      yield [dir, file];
    }
  }
}

module.exports = ModuleManager;
